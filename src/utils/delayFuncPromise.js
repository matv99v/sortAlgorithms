export default function(func, ms) {
    return new Promise(resolve => {
        setTimeout( () => {
            func();
            resolve();
        }, ms);
    });
}
