const fs = require('fs');
const jsc = require('jsverify');
const path = require('path');
const { start } = require('repl');

eval(fs.readFileSync('code.js')+'');
//Need Pentagon, Star, Empty, Square, Hourglass, Pentacross, Complex, G, and H 
const pentagon = [
    [0,1,2,3,4],
    [[0,1], [1,2], [2,3], [3,4], [4,0]]
];

const star = [
    [0,1,2,3,4], 
    [[0,2], [2,4], [4,1], [1,3], [3,0]]
];

const empty = [
    [],[]
];

const line = [
    [0,1,2], 
    [[0,1], [1,2]]
]; 

const square = [ 
    [0,1,2,3,4], 
    [[0,1], [1,2], [2,3], [3,0]]
];

const hourglass = [ 
    [0,1,2,3,4],
    [[0,2], [2,3], [3,1], [1,0]]
];

let pentacross = [
    [0,1,2,3,4],
    [ [0,1], [1,2], [2,3], [3,4], [4,2], [4,0] ]
];

let complex = [
    [0,1,2,3,4],
    [ [0,1], [0,3], [1,2], [2,0], [2,3], [0,4] ]
];

const G = [
    [0,1,2,3,4,5,6,7],
    [[0,1],[0,3],[0,5],[1,2],[1,4],[2,3],[2,7],[3,6],[4,5],[4,7],[5,6],[6,7]]
];

const H = [
    [0,1,2,3,4,5,6,7],
    [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[6,2],[1,5],[7,3],[4,0]]
];
// Test for each pair 
try {
    //Ismorphic 
    if (!are_isomorphic(pentagon, star)) throw new Error('Test failed: pentagon & star');
    //non-isomorphic
    if (are_isomorphic(empty, line)) throw new Error('Test failed: empty & line');
    if (are_isomorphic(pentagon, line)) throw new Error('Test failed: pentagon & line');
    //isomorphic
    if (!are_isomorphic(square, hourglass)) throw new Error('Test failed: square & hourglass');
    //non-isomorphic
    if (are_isomorphic(square, pentagon)) throw new Error('Test failed: square & pentagon');
    if (are_isomorphic(pentacross, complex)) throw new Error('Test failed: pentacross & complex');
    //Larger Graph Test 
    if (!are_isomorphic(G, H)) throw new Error('Test failed: G & H');
    
    console.log("All tests passed.");
} catch (error) {
    console.error(error.message);
    process.exit(1);
}
