import cv2
import numpy as np
import os
from PIL import Image

def preprocess(image):
    print('Preprocessing started...')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) 
    blur = cv2.GaussianBlur(gray, (3,3), 6) 
    blur = cv2.bilateralFilter(blur, 9, 75, 75)
    threshold_img = cv2.adaptiveThreshold(blur, 255, 1, 1, 11, 2)
    print('Preprocessing completed...')
    return threshold_img

def main_outline(contour):
    biggest = np.array([])
    max_area = 0
    for i in contour:
        area = cv2.contourArea(i)
        if area >50:
            peri = cv2.arcLength(i, True)
            approx = cv2.approxPolyDP(i , 0.02* peri, True)
            if area > max_area and len(approx) == 4:
                biggest = approx
                max_area = area
    return biggest, max_area

def reframe(points):
    points = points.reshape((4, 2))
    points_new = np.zeros((4, 1, 2),dtype = np.int32)
    add = points.sum(1)
    points_new[0] = points[np.argmin(add)]
    points_new[3] = points[np.argmax(add)]
    diff = np.diff(points, axis =1)
    points_new[1] = points[np.argmin(diff)]
    points_new[2] = points[np.argmax(diff)]
    return points_new

def splitcells(img):
    rows = np.vsplit(img, 9)
    boxes = []
    for r in rows:
        cols = np.hsplit(r, 9)
        for box in cols:
            boxes.append(box)
    return boxes

def CropCell(cells):
    Cells_croped = []
    for image in cells:
        img = np.array(image)
        img = img[6:46, 6:46]
        img = Image.fromarray(img)
        Cells_croped.append(img)
    return Cells_croped

def process(img):
    print('Processing image...')
    folder="data/sudoku_imgs"
    sudoku_a = cv2.imread(folder+'/'+ '3.jpg')
    sudoku_a = cv2.resize(sudoku_a, (450, 450))
    su_contour_2 = sudoku_a.copy()

    img = cv2.imread(img)
    puzzle = cv2.resize(img, (450,450))
    # print('@@@we are here@@@')
    su_threshold = preprocess(puzzle)
    su_contour_1 = puzzle.copy()
    su_contour, su_hierarchy = cv2.findContours(su_threshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(su_contour_1, su_contour, -1, (0, 255, 0), 3)

    su_biggest, su_maxArea = main_outline(su_contour)
    if su_biggest.size != 0:
        su_biggest = reframe(su_biggest)

    cv2.drawContours(su_contour_2, su_biggest, -1, (0, 255, 0), 10)
    su_pts1 = np.float32(su_biggest)
    su_pts2 = np.float32([[0, 0], [450, 0], [0, 450], [450, 450]])
    su_matrix = cv2.getPerspectiveTransform(su_pts1, su_pts2)  
    su_imagewrap = cv2.warpPerspective(puzzle, su_matrix, (450, 450))
    su_imagewrap =cv2.cvtColor(su_imagewrap, cv2.COLOR_BGR2GRAY)

    sudoku_cell = splitcells(su_imagewrap)
    sudoku_cell_cropped = CropCell(sudoku_cell)

    return sudoku_cell_cropped








