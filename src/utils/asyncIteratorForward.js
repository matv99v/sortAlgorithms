export default function asyncLoop(iterations, iterationBody, callback) {
    let index = 0;
    let done  = false;

    const loop = {
        next() {
            if (done) {
                return;
            }
            if (index < iterations) {
                index++;
                iterationBody(loop);
            } else {
                done = true;
                callback(); // eslint-disable-line
            }
        },
        getIteration() {
            return index - 1;
        },
        break() {
            done = true;
            callback();
        },
        reset(i = 0) {
            index = i;
        }
    };

    loop.next();
    return loop;
}
