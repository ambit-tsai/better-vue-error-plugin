const { parse } = require('@babel/parser');
const traverse = require("@babel/traverse").default;
const generate = require('@babel/generator').default;
const Code = require('./Code');


module.exports = function (source) {
    if (this._module.rawRequest === this.query.moduleName) {
        const ast = parse(source, {
            sourceType: 'module',   // support ES module
        });
        traverse(ast, {
            AssignmentExpression(path) {
                const { node: { left, right } } = path;
                if (left.name === 'generateComponentTrace' && right.type === 'FunctionExpression') {
                    // Work in vue 2.5 or above
                    const ast = parse(Code.stack);
                    path.insertBefore(ast.program.body);
                    path.get('right').replaceWithSourceString(Code.generateComponentTrace);
                    path.skip();
                } else if (left.name === 'warn' && right.type === 'FunctionExpression') {
                    path.get('right').replaceWithSourceString(Code.warn);
                    path.skip();
                } else if (left.name === 'tip' && right.type === 'FunctionExpression') {
                    path.get('right').replaceWithSourceString(Code.tip);
                    path.skip();
                }
            },
            VariableDeclarator(path) {
                const { node: { id, init } } = path;
                if (id.name === 'generateComponentTrace'
                    && init
                    && init.type === 'FunctionExpression'
                    && init.params.length === 1
                ) {
                    // Work in vue 2.4
                    const ast = parse(Code.stack);
                    path.parentPath.insertBefore(ast.program.body);
                    path.get('init').replaceWithSourceString(Code.generateComponentTrace);
                    path.skip();
                }
            },
            // NOTE: a draft
            // FunctionDeclaration(path) {   
            //     if (path.node.id.name === 'invokeWithErrorHandling') {
            //         const ast1 = parse(Code.logInvokeError);
            //         path.insertBefore(ast1.program.body);
            //         const ast2 = parse(Code.invokeWithErrorHandling);
            //         path.get('body').replaceWith(ast2.program.body[0].body);
            //         path.skip();
            //     }
            // },
        });
        source = generate(ast).code;
    }
    return source;
}
