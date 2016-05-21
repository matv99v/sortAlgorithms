export default function asyncLoop(iterations, iterationBody, callback) {
    let index = iterations + 1;
    let done  = false;

    const loop = {
        next() {
            if (done) {
                return;
            }
            if (index > 0) {
                index--;
                iterationBody(loop);
            } else {
                done = true;
                callback(); // eslint-disable-line
            }
        },
        getIteration() {
            return index;
        },
        break() {
            done = true;
            callback();
        },
        reset() {
            index = iterations;
        }
    };

    loop.next();
    return loop;
}
