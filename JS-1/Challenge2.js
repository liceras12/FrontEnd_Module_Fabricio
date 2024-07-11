function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

let arr2 = [7, 9, 1, 'a', 'a', 'f', 9, 4, 2, 'd', 'd'];
console.log(removeDuplicates(arr2)); // Output: [7, 9, 1, 'a', 'f', 4, 2, 'd']

function concatArrays(arrays) {
    return arrays.map(subArray => subArray.join(' '));
}

let data = [
    ["The", "little", "horse"],
    ["Plane", "over", "the", "ocean"],
    ["Chocolate", "ice", "cream", "is", "awesome"],
    ["this", "is", "a", "long", "sentence"]
];

console.log(concatArrays(data)); 