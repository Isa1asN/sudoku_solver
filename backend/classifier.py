from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os

def classify(model, cropped_cells):
    print("Classifying...")

    cells = np.array([cv2.resize(np.array(img), (32, 32)) for img in cropped_cells])
    puzzle_predictions = model.predict(cells, verbose=False).argmax(axis= -1)
    puzzle_list = np.array(puzzle_predictions)
    puzzle_list = puzzle_list.reshape(9, 9)
    print('classification complete')

    # image is being deleted after processing
    # os.remove('received_images/received_image.jpg')

    return puzzle_list

