import numpy as np



def find_empty_cell(puzzle):
    for i in range(9):
        for j in range(9):
            if puzzle[i][j] == 0:
                return (i, j)
    return None

def valid(puzzle, num, pos):
    # check row
    for i in range(9):
        if puzzle[pos[0]][i] == num and pos[1] != i:
            return False
    # check column
    for i in range(9):
        if puzzle[i][pos[1]] == num and pos[0] != i:
            return False
    # check box
    box_x = pos[1] // 3
    box_y = pos[0] // 3
    for i in range(box_y*3, box_y*3 + 3):
        for j in range(box_x*3, box_x*3 + 3):
            if puzzle[i][j] == num and (i, j) != pos:
                return False
    return True

def solve(puzzle):
    find = find_empty_cell(puzzle)
    if not find:
        return True
    else:
        row, col = find
    for i in range(1, 10):
        if valid(puzzle, i, (row, col)):
            puzzle[row][col] = i
            if solve(puzzle):
                return True
            puzzle[row][col] = 0
    return False

def solve_sudoku(puzzle):
    flag = solve(puzzle)
    if flag:
        print("puzzle solved:")
        return puzzle
    else:
        print("No solution exists for the puzzle, its unsolvable or could be a mistake in classification")
        return 0
