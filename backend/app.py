from flask import Flask, request, jsonify
import base64
import imutils
import cv2
from PIL import Image
from io import BytesIO
import os
import numpy as np
from tensorflow.keras.models import load_model
from processor import process
from classifier import classify
from solver import SudokuSolver
from annotator import find_puzzle, cellLocFind, annotate

app = Flask(__name__)

model = load_model('model/model.h5')

@app.route('/home', methods=['GET'])
def home():
    return jsonify({'message': 'Backend connection exists...'}), 200


UPLOAD_FOLDER = 'received_images'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/solve_picture', methods=['POST'])
async def process_image():
    try:
        data = request.get_json()
        image_data = data.get('imageData')

        # print(image_data)
        image_bytes = base64.b64decode(image_data)

        image = Image.open(BytesIO(image_bytes))

        save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'received_image.jpg')
        image.save(save_path)
        print("saved image at: ", save_path)

        processed_image = process(save_path)
        classified_list = classify(model, processed_image)
        print(classified_list)

        puzzle = SudokuSolver(classified_list)
        solved_puzzle = puzzle.solve_sudoku(imgFlag=True)
        if solved_puzzle == -1:
            print(solved_puzzle, ' : No solution exists for the puzzle, its unsolvable or could be a mistake in classification')
            return jsonify({'message': -1, 'classified' : classified_list.tolist()})
        else:
            print(solved_puzzle)
            return jsonify({'message': 1, 'solved' : solved_puzzle.tolist()})


    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/solve_grid', methods=['POST'])
async def solve_grid():
    try:
        data = request.get_json()
        grid = data.get('grid')
        # grid = np.array(grid)
        initial_matrix = data.get('grid')
        print("grid received: ", initial_matrix)
        with open('config.txt', 'w') as f:
            for row in initial_matrix:
                f.write(' '.join([str(elem) for elem in row]) + '\n')


        puzzle = SudokuSolver(grid)
        solved_puzzle = puzzle.solve_sudoku()
        if solved_puzzle == -1:
            print(solved_puzzle, ' : No solution exists for the puzzle, its unsolvable or could be a mistake in classification')
            return jsonify({'message': -1, 'classified' : grid})
        else:
            # print(solved_puzzle)
            imgTobe = cv2.imread('received_images/received_image.jpg')
            imgTobe = imutils.resize(imgTobe, width=600)
            (puzzleImage, warped) = find_puzzle(imgTobe, debug=0)
            cellLocs = cellLocFind(warped)
            print('unsolved: ', initial_matrix)
            print('solved: ', solved_puzzle)

            with open('config.txt', 'r') as f:
                boom = f.read().splitlines()
            initial_matrix = []
            for line in boom:
                initial_matrix.append([int(x) for x in line.split()])

            annotated = annotate(initial_matrix, solved_puzzle, cellLocs, puzzleImage)
            cv2.imwrite('annotated.png', annotated)
            # annotated = imutils.resize(annotated, width=300)
            encoded_img = base64.b64encode(open('annotated.png', 'rb').read()).decode('utf-8')

            return jsonify({'message': 1, 'solved' : solved_puzzle, 'image': encoded_img})
            


    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
