# Sudoku solver app

## Overview

The Sudoku Solver App is a mobile application designed to solve Sudoku puzzles using a combination of React Native for the front end, flask for the back end, and a TensorFlow-based Convolutional Neural Network (CNN) for digit recognition within the Sudoku grid.

## Features

* Sudoku Solving: The app utilizes a CNN to recognize and solve Sudoku puzzles.

* Mobile App: Built with React Native, providing a user-friendly interface for capturing and solving puzzles.

* Back-End Processing: Flask handles the communication between the front end and the TensorFlow-powered Sudoku Solver.

## How it works

* Capturing Sudoku Grids: Users can take pictures of Sudoku grids using the app's camera feature.

* Image processing: The app has a backend that can process the image taken by the user to be recognized.

* Digit Recognition: The trained CNN model processes each cell in the grid, recognizing digits and forming a complete Sudoku matrix.

* Solving: The app employs a back-end Sudoku Solver to find the solution to the recognized puzzle.

## The model

The model used in this project is a Convolutional Neural Network (CNN) designed for digit recognition.
The CNN consists of the following layers:

* First Conv2D layer with 32 filters, a 3x3 kernel size, and ReLU activation function.

* MaxPooling2D layer to reduce spatial dimensions.

* Second Conv2D layer with 64 filters, a 3x3 kernel size, and ReLU activation function.

* Another MaxPooling2D layer to further reduce spatial dimensions.

* Third Conv2D layer with 64 filters and a 3x3 kernel size.

* Flatten layer to transform the 2D output into a 1D vector.

* Dense layer with 64 neurons and ReLU activation function.

* Output Dense layer with 10 neurons (corresponding to digits 0-9, 0 for empty cells) and a softmax activation function for multi-class classification.

## Compilation

Compiled using the Adam optimizer, categorical crossentropy loss function, and accuracy as the metric.
The model was trained on the Char74k dataset for digits and has an accuracy of 99.8%.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sudoku-solver.git
   cd sudoku-solver

2. Install dependencies for the React Native app:

    ```bash
    cd SudokuSolver
    npm install

3. Install dependecies for the FLask backend:

    ```bash
    cd backend
    pip install -r requirements.txt

## Usage

1. Start the flask server for the backend:

    ```bash
    cd backend
    python app.py

2. Run the react native app using expo:

    ```bash
    cd SudokuSolver
    expo start
