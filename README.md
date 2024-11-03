# Graph Isomorphism

Devise an algorithm to determine whether two given graphs are isomorphic or not.
It takes two graphs as an argument and returns `true` or `false`, depending on
whether the graphs are isomorphic or not. Your algorithm needs to handle both
the case where the two graphs are isomorphic and where they are not isomorphic.

Hint: Your algorithm does not need to be the best possible algorithm, but should
avoid unnecessarily repeating work.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ time complexity of your algorithm?

## Answer
Looking back at my code the worst-case scenario would be $\Theta(|V!| x |V^4|)$. The reason this is the worst-case is that we have to go through each permutation of V to find the arrangement that yields identical adjacency matrices. This will give us $|V!|$ combinations. We also have to account that generating each combination takes constant time, and then generating a new adjacency matrix for each permutation would be $|V^2|$. We also have to test each permutation which would also generate $|V^2|$ to check to see if they are equal.

## Sources
I entered the prompt into ChatGPT to give me a deeper understanding of the problem and the outline of notes that are needed for the code. These are all the comments in the code in the outline that I was given but written in my own words. I wrote the rest of the code myself. I just had a diffcult time trying to follow the slides that were provided to us on the information. I also spoke with the TA about my permuteMatrix function because I was having problems figuring out what to do with the swapping and reverting the matrices. 

## Plagraism Statement
“I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.”

