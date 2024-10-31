function are_isomorphic(graph1, graph2) {
  // Check if the number of vertices is the same
  if (graph1.length !== graph2.length) {
    return false;
  }

  // Create adjacency matrices for both graphs
  const adjMatrix1 = createAdjacencyMatrix(graph1);
  const adjMatrix2 = createAdjacencyMatrix(graph2);

  // Check if the adjacency matrices are isomorphic
  return areMatricesIsomorphic(adjMatrix1, adjMatrix2);
}

function createAdjacencyMatrix(graph) {
  const matrix = [];
  for (let i = 0; i < graph.length; i++) {
    matrix[i] = new Array(graph.length).fill(0);
    for (const neighbor of graph[i]) {
      matrix[i][neighbor] = 1;
    }
  }
  return matrix;
}

function areMatricesIsomorphic(matrix1, matrix2) {
  // Check if the matrices have the same dimensions
  if (matrix1.length !== matrix2.length) {
    return false;
  }

  // Check if the matrices have the same number of edges
  if (countEdges(matrix1) !== countEdges(matrix2)) {
    return false;
  }

  // Try all possible permutations of vertices in matrix2
  const vertices = Array.from({ length: matrix1.length }, (_, i) => i);
  return permute(vertices, 0, matrix1, matrix2);
}

function countEdges(matrix) {
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      count += matrix[i][j];
    }
  }
  return count / 2; // Since we count each edge twice
}

function permute(vertices, index, matrix1, matrix2) {
  if (index === vertices.length) {
    return areMatricesEqual(matrix1, matrix2, vertices);
  }

  for (let i = index; i < vertices.length; i++) {
    [vertices[index], vertices[i]] = [vertices[i], vertices[index]];
    if (permute(vertices, index + 1, matrix1, matrix2)) {
      return true;
    }
    [vertices[index], vertices[i]] = [vertices[i], vertices[index]];
  }

  return false;
}

function areMatricesEqual(matrix1, matrix2, permutation) {
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1.length; j++) {
      if (matrix1[i][j] !== matrix2[permutation[i]][permutation[j]]) {
        return false;
      }
    }
  }
  return true;
}
