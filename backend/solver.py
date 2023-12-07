import numpy as np


class SudokuSolver:
    def __init__(self, puzzle):
        self.puzzle = puzzle
        
    def find_empty_cell(self):
        for i in range(9):
            for j in range(9):
                if self.puzzle[i][j] == 0:
                    return (i, j)
        return None

    def valid(self, num, pos):
        # check row
        for i in range(9):
            if self.puzzle[pos[0]][i] == num and pos[1] != i:
                return False
        # check column
        for i in range(9):
            if self.puzzle[i][pos[1]] == num and pos[0] != i:
                return False
        # check box
        box_x = pos[1] // 3
        box_y = pos[0] // 3
        for i in range(box_y*3, box_y*3 + 3):
            for j in range(box_x*3, box_x*3 + 3):
                if self.puzzle[i][j] == num and (i, j) != pos:
                    return False
        return True

    def solve(self):
        find = self.find_empty_cell(self.puzzle)
        if not find:
            return True
        else:
            row, col = find
        for i in range(1, 10):
            if self.valid(self.puzzle, i, (row, col)):
                self.puzzle[row][col] = i
                if self.solve(self.puzzle):
                    return True
                self.puzzle[row][col] = 0
        return False

    def solve_sudoku(self):
        flag = self.solve(self.puzzle)
        if flag:
            print("puzzle solved:")
            return self.puzzle
        else:
            print("No solution exists for the puzzle, its unsolvable or could be a mistake in classification")
            return 0
