const fs = require('fs');
const jsc = require('jsverify');
const path = require('path');

// Load the code file
eval(fs.readFileSync('code.js') + '');

// Define test graphs for deterministic testing
const pentagon = [
    [0, 1, 2, 3, 4],
    [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 0]
    ]
];

const star = [
    [0, 1, 2, 3, 4],
    [
        [0, 2],
        [2, 4],
        [4, 1],
        [1, 3],
        [3, 0]
    ]
];

const empty = [[], []];
const line = [[0, 1, 2], [[0, 1], [1, 2]]];
const square = [
    [0, 1, 2, 3],
    [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0]
    ]
];
const hourglass = [
    [0, 1, 2, 3],
    [
        [0, 2],
        [2, 3],
        [3, 1],
        [1, 0]
    ]
];
const pentaCross = [
    [0, 1, 2, 3, 4],
    [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 2],
        [4, 0]
    ]
];
const complex = [
    [0, 1, 2, 3, 4],
    [
        [0, 1],
        [0, 3],
        [1, 2],
        [2, 0],
        [2, 3],
        [0, 4]
    ]
];
const G = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [
        [0, 1],
        [0, 3],
        [0, 5],
        [1, 2],
        [1, 4],
        [2, 3],
        [2, 7],
        [3, 6],
        [4, 5],
        [4, 7],
        [5, 6],
        [6, 7]
    ]
];
const H = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [6, 2],
        [1, 5],
        [7, 3],
        [4, 0]
    ]
];

// Test Cases
console.log("Running deterministic tests...");

try {
    if (!are_isomorphic(pentagon, star)) throw new Error("Failed for pentagon & star");
    if (are_isomorphic(empty, line)) throw new Error("Failed for empty and line");
    if (are_isomorphic(pentagon, line)) throw new Error("Failed for pentagon & line");
    if (!are_isomorphic(square, hourglass)) throw new Error("Failed for square and hourglass");
    if (are_isomorphic(square, pentagon)) throw new Error("Failed for square and pentagon");
    if (are_isomorphic(pentaCross, complex)) throw new Error("Failed for pentaCross and complex");
    if (!are_isomorphic(G, H)) throw new Error("Failed for G and H");
    if (!are_isomorphic(G, G)) throw new Error("Failed for G and G");
    console.log("All deterministic tests passed!");
} catch (error) {
    console.error(error.message);
}

// Randomized Property-Based Test with jsverify
console.log("Running randomized property-based tests...");
const graphGen = jsc.bless({
    generator: jsc.array(jsc.array(jsc.nat(1))).generator
});

jsc.property("Self-isomorphism", graphGen, function (graph) {
    // Ensuring that any graph is isomorphic to itself
    return are_isomorphic(graph, graph);
});

jsc.property("Different vertex count", graphGen, graphGen, function (graph1, graph2) {
    // Generate graphs of differing vertex counts to ensure non-isomorphism
    return graph1.length !== graph2.length || !are_isomorphic(graph1, graph2);
});

console.log("Randomized tests completed!");
