
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
let component;
while(count) {
    component = getComponent(count--, component);
    if (count === 1) {
        component.mounted = function () {
            throw new Error('a test error');
        };
    }
}


export default component;
