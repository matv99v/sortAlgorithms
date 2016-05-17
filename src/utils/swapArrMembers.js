export default function(array, [p, c]) {
    const buffer = array[p];
    array[p]     = array[c];
    array[c]     = buffer;

    return array;
}
