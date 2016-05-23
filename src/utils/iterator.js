export default function iterator(initValue, finalValue, iterationBodyFunc, callBackFunc) {
    const increment = initValue < finalValue ? 1 : -1;
    let index       = initValue;
    let done        = false;

    const loop = {
        next() {
            if (done) {
                return;
            }
            if (index !== finalValue + increment) {
                index += increment;
                iterationBodyFunc(loop);
            } else {
                done = true;
                callBackFunc();
            }
        },
        getIteration() {
            return index - increment;
        },
        break() {
            done = true;
            callBackFunc();
        },
        resetMargins(a, b) {
            if (a) initValue  = a; // eslint-disable-line
            if (b) finalValue = b; // eslint-disable-line
        },
        resetIndexToInit() {
            index = initValue;
        }
    };

    loop.next();
    return loop;
}
