function findSmallestNumber(arr) {
    return Math.min(...arr);
}

let arr1 = [12, 6, 10, 2, 45, 100];
console.log(findSmallestNumber(arr1)); 

function findLeastFrequent(arr) {
    let frequency = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(frequency).reduce((a, b) => 
        frequency[a] < frequency[b] ? a : b
    );
}

let arr2 = [3, 'c', 'c', 'a', 2, 3, 'c', 3, 'c', 2, 4, 9, 9];
console.log(findLeastFrequent(arr2));