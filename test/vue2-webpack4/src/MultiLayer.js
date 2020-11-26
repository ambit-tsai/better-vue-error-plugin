
function getComponent(count, child) {
    const name = `Component_${count}`;
    return {
        name,
        render: h => h('div', {}, [
            h('span', {
                domProps: {
                    innerText: name,
                },
            }),
            child && h(child),
        ]),
    };
}


let count = 10;
let component = {
    name: 'MyButton',
    render: h => h('button', {
        domProps: {
            innerText: 'click me',
        },
        on: {
            click() {
                a.b + c
            }
        },
    }),
    mounted: function () {
        throw new Error('a test error');
    },
};

while(count) {
    component = getComponent(count--, component);
}


export default component;
