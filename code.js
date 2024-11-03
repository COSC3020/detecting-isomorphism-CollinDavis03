// I inputted the prompt into ChatGPT and asked to give me an outline for what is needed in the
//assignment. I asked it to not provide me any code becasue I wanted to attempt it on my own. 
function are_isomorphic(graph1, graph2) { 
    //Check the number of vertices and edges match
    if (graph1[0].length !== graph2[0].length || graph1[1].length !== graph2[1].length) {
        return false;
    }

    // Quick Check: compare degree sequences
    // DS = Degree Sequence 
    const DS1 = getDS(graph1); 
    const DS2 = getDS(graph2); 
    if (!arrayEqual(DS1, DS2)) return false; 
    //convert graph1 to adjacency matrix to compare to permutations of graph2 
    const MATRIX = UGTAM(graph1); 
    return permuteMatrix(MATRIX, graph2, 0); 

}

function permuteMatrix(MATRIX, graph, lo) {
    // Check if the current permutation of graph2 matches the adjacency matrix of graph1
    if (matrixEquality(MATRIX, UGTAM(graph))) {
        return true;
    }

    let V = graph[0];
    if (lo >= V.length - 1) {
        return false; // If all vertices are permuted, end recursion
    }

    // Try swapping each vertex with the current position
    for (let i = lo; i < V.length; i++) {
        if (i !== lo) {
            swap(V, lo, i); // Swap vertices to get a new permutation
            graph[0] = [...V]; // Ensure a shallow copy to avoid direct mutation
        }

        // Recurse to the next position
        if (permuteMatrix(MATRIX, graph, lo + 1)) {
            return true;
        }

        // Revert the swap after recursion
        if (i !== lo) {
            swap(V, lo, i); // Revert the swap
            graph[0] = [...V]; // Ensure the original order is restored
        }
    }
    return false;
}

//function to swap two elements in an array.
function swap(arr, i, j) { 
  [arr[i], arr[j]] = [arr[j], arr[i]];
} 

// Function to convert an undirected graph to an adjacency matrix 
// UGTAM = undirected Graph To Adjacent Matrix
function UGATAM(graph) { 
  // V = vertices and E = edges
  const V = graph[0]; 
  const E = graph[1]; 
  //Initialize adjacency matrix with zeros 
  const adjMatrix = Array.from({ length: V.length }, () => Array(V.length).fill(0)); 
  
  // Fill in edges (undirected) in the adjacency matrix 
  E.forEach(([u,v]) => {
    adjMatrix[V.indexOf(u)][V.indexOf(v)] = 1; 
    adjMatrix[V.indexOf(v)][V.indexOf(u)] = 1;
  });
  return adjMatrix; 
} 
// Function to get a sorted degree sequence for a graph 
// getDS = Get Degree Sequence
function getDS(graph) {
  const V = graph[0]; 
  const E = graph[1]; 
  const degrees = Array(V.length).fill(0); // Start array with zeros
  
  //Count the edges for each vertex to calculate the degrees 
  E.forEach(([u,v]) => {
    degrees[V.indexOf(u)]++;
    degrees[V.indexOf(v)]++; 
  });
  return degrees.sort((a,b) => a - b); //Sort the degrees to form a sequence for comparison 
}

// Function to check if two matrices are equal
function matrixEquality(m1, m2) { 
  if (m1.length !== m2.length) {
      return false; //Check if dimensions are the same 
  }
// Check each element for equality
  for (let i = 0; i <m1.length; i++) { 
    for (let j = 0; j < m1[i].length; j++) {
      if (m1[i][j] !== m2[i][j]) return false; 
    }
  }
  return true; 
}

//function to compare if two arrays are equal 
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]); 
}
