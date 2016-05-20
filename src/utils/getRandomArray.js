export default function(i) {
    const array = [];

    while (i) {
        const rndNum = Math.floor(Math.random() * 100) + 1;
        array.push(rndNum);
        --i; // eslint-disable-line
    }
    return array;
}
