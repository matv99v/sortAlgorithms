'use strict';

const arr = '0123456789'.split('').sort( (a, b) => {
    const rnd = Math.random() - 0.5;
    if (rnd >= 0) return true;
    if (rnd < 0)  return false;
});


const docFrag = document.createDocumentFragment();
arr.forEach( el => {
    const li = document.createElement('li');
    li.textContent = el;
    docFrag.appendChild(li);
});
document.getElementById('app').appendChild(docFrag);


function swap(i1, i2) {
    const buffer = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = buffer;
    return arr;
}

function promise(i1, i2) {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            console.log(i1, i2, arr);
            if (i1 >= 0) arr[i1].classList.toggle('check');
            if (i2 >= 0) arr[i2].classList.toggle('check');

            resolve();
        }, 500);
    });
}

arr.reduce( (sum, el, i) => sum.then( () => promise(i, i - 1) ), Promise.resolve());
