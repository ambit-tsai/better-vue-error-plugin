
module.exports = {
    stack: `
        function Stack() {}
        function Trace(msg) {
            this.msg = msg;
            this.length = 0;
            this.stack = new Stack();
        }
        Trace.prototype = {
            push: function (record) {
                this.stack['*' + this.length++] = record;
            },
            toString: function () {
                var str = this.msg + '\\n';
                for (var i = 0; i < this.length; ++i) {
                    str += '\\n' + (
                        i ? repeat(' ', 5 + i * 2) : '---> '
                    ) + this.stack['*' + i];
                }
                return str;
            },
        };
    `,

    generateComponentTrace: `function (vm) {
        var trace = new Trace(vm ? '\\n\\nfound in' : '');
        if (vm) {
            if (vm._isVue && vm.$parent) {
                var tree = [];
                var currentRecursiveSequence = 0;
                while (vm) {
                    if (tree.length > 0) {
                        var last = tree[tree.length - 1];
                        if (last.constructor === vm.constructor) {
                            currentRecursiveSequence++;
                            vm = vm.$parent;
                            continue
                        } else if (currentRecursiveSequence > 0) {
                            tree[tree.length - 1] = [last, currentRecursiveSequence];
                            currentRecursiveSequence = 0;
                        }
                    }
                    tree.push(vm);
                    vm = vm.$parent;
                }
                tree.forEach(function (vm, i) {
                    trace.push(Array.isArray(vm)
                        ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)"
                        : formatComponentName(vm)
                    );
                });
            } else {
                trace.push(formatComponentName(vm));
            }
        }
        return trace;
    }`,

    warn: `function (msg, vm) {
        var trace = generateComponentTrace(vm);
        if (config.warnHandler) {
            config.warnHandler.call(null, msg, vm, trace.toString());
        } else if (hasConsole && !config.silent) {
            if (trace.length) {
                console.error("[Vue warn]: " + msg + trace.msg, trace.stack);
            } else {
                console.error("[Vue warn]: " + msg);
            }
        }
    }`,

    tip: `function (msg, vm) {
        if (hasConsole && !config.silent) {
            var trace = generateComponentTrace(vm);
            if (trace.length) {
                console.warn("[Vue tip]: " + msg + trace.msg, trace.stack);
            } else {
                console.warn("[Vue tip]: " + msg);
            }
        }
    }`,

    logInvokeError: `function logInvokeError(info, args, handler) {
        var msg = info;
        if (args instanceof Object && args[0] instanceof Event) {
            msg += ' "' + args[0].type + '"';
        }
        msg += ': "' + handler.toString()
                .replace(/^[^{]+\\{\\s*(return)?\\s*/, '')
                .replace(/\\s*\\}$/, '')
                .replace(/_vm\\./g, '')
            + '"';
        console.error(msg);
    }`,

    invokeWithErrorHandling: `function invokeWithErrorHandling(
        handler,
        context,
        args,
        vm,
        info
    ) {
        var res;
        try {
            res = args ? handler.apply(context, args) : handler.call(context);
            if (res && !res._isVue && isPromise(res) && !res._handled) {
                res.catch(function (e) {
                    logInvokeError(info, args, handler);
                    return handleError(e, vm, info + " (Promise/async)");
                });
                // issue #9511
                // avoid catch triggering multiple times when nested calls
                res._handled = true;
            }
        } catch (e) {
            logInvokeError(info, args, handler);
            handleError(e, vm, info);
        }
        return res
    }`,
}