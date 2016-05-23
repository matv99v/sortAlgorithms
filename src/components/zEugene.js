const z = [6, 3, 2, 5, 1];

function bubbleSort(a) {
    let temp,
        flag = false,
        i = 0,
        length = a.length - 1;

    function step() {
        if (length > 1) {
            if (i === length) {
                length--;
                i = 1;
                flag = false;
            } else {
                i++;
            }

            if (a[i - 1] > a[i]) {
                temp = a[i];
                a[i] = a[i - 1];
                a[i - 1] = temp;
                flag = true;

                console.log(a);
                setTimeout(step, 1000);
            } else {
                step();
            }
        }
    }
    step();
}

bubbleSort(z);
