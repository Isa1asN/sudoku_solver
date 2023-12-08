from flask import Flask, request, jsonify
import base64
from PIL import Image
from io import BytesIO
import os
import numpy as np
from tensorflow.keras.models import load_model
from processor import process
from classifier import classify
from solver import SudokuSolver

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
        solved_puzzle = puzzle.solve_sudoku()
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
        print("grid received: ", len(grid))

        puzzle = SudokuSolver(grid)
        solved_puzzle = puzzle.solve_sudoku()
        if solved_puzzle == -1:
            print(solved_puzzle, ' : No solution exists for the puzzle, its unsolvable or could be a mistake in classification')
            return jsonify({'message': -1, 'classified' : grid})
        else:
            print(solved_puzzle)
            return jsonify({'message': 1, 'solved' : solved_puzzle})


    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
