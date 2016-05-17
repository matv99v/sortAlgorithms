export default function(ms, func) {
    return new Promise(resolve => {
        setTimeout( () => {
            func();
            resolve();
        }, ms);
    });
}
