# Specifications document

## Introduction
Degree programme: bachelor in computer science (BCS)

The project is a Web-based chess game, in which you can play against a chess bot. User interface is done using a library called [react-chessboard](https://www.npmjs.com/package/react-chessboard), and all of the game and business logic is built manually. Project is done with React (TypeScript), 
and will required many algorithms for the game logic to work. Most of the algorithms are quite simple and fast ranging from time complexities O(1) to O(n). All of input coming from user will come either from some sort of mouse on desktop, or touching the screen on mobile. 
All of the input coming from user and / or bot are x, y coordinates. 

## Specifics
Looking forwards, the two single biggest hurdles and checkpoints in order will be getting the game and business logic working correctly, and the algorithm for the chess bot. This algorithm will be using the Minimax algorithm with alpha-beta pruning, which is a O(b^(d/2)) in theory, and what we will aim for.
Whatever the case, this algorithm should be as fast as possible, because it is simply the most important single piece affecting on how smooth the gameplay feels.

Both the code and documents will be in english. 

Preferred programming languages: Python, JavaScript
