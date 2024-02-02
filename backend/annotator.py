from imutils.perspective import four_point_transform
from skimage.segmentation import clear_border
import numpy as np
import imutils
import cv2

# unsolved = [[0, 0, 1, 0, 0, 0, 9, 4, 0],
#         [4, 0, 7, 8, 3, 0, 2, 1, 0],
#         [9, 0, 6, 5, 0, 0, 8, 0, 3],
#         [8, 0, 0, 6, 0, 0, 0, 0, 0],
#         [0, 0, 0, 0, 2, 0, 1, 3, 0],
#         [0, 0, 0, 0, 0, 3, 5, 0, 0],
#         [5, 7, 0, 0, 0, 2, 4, 8, 0],
#         [1, 6, 0, 0, 9, 0, 0, 5, 0],
#         [0, 0, 0, 4, 1, 0, 0, 0, 7]]

# solved = [[3, 8, 1, 2, 7, 6, 9, 4, 5], 
#         [4, 5, 7, 8, 3, 9, 2, 1, 6],
#         [9, 2, 6, 5, 4, 1, 8, 7, 3],
#         [8, 1, 3, 6, 5, 4, 7, 2, 9], 
#         [6, 4, 5, 9, 2, 7, 1, 3, 8],
#         [7, 9, 2, 1, 8, 3, 5, 6, 4],
#         [5, 7, 9, 3, 6, 2, 4, 8, 1],
#         [1, 6, 4, 7, 9, 8, 3, 5, 2],
#         [2, 3, 8, 4, 1, 5, 6, 9, 7]]


def find_puzzle(image, debug=False):
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	blurred = cv2.GaussianBlur(gray, (7, 7), 3)
	thresh = cv2.adaptiveThreshold(blurred, 255,
		cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
	thresh = cv2.bitwise_not(thresh)
	if debug:
		cv2.imshow("Puzzle Thresh", thresh)
		cv2.waitKey(0)
	cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,
		cv2.CHAIN_APPROX_SIMPLE)
	cnts = imutils.grab_contours(cnts)
	cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
	puzzleCnt = None
	for c in cnts:
		peri = cv2.arcLength(c, True)
		approx = cv2.approxPolyDP(c, 0.02 * peri, True)

		if len(approx) == 4:
			puzzleCnt = approx
			break
	if puzzleCnt is None:
		raise Exception(("Could not find Sudoku puzzle outline. "
			"Try debugging your thresholding and contour steps."))
	if debug:
		output = image.copy()
		cv2.drawContours(output, [puzzleCnt], -1, (0, 255, 0), 2)
		cv2.imshow("Puzzle Outline", output)
		cv2.waitKey(0)
	puzzle = four_point_transform(image, puzzleCnt.reshape(4, 2))
	warped = four_point_transform(gray, puzzleCnt.reshape(4, 2))
	print('Puzzle found')
	if debug:
		cv2.imshow("Puzzle Transform", puzzle)
		cv2.waitKey(0)
    
	return (puzzle, warped)


def cellLocFind(warped):
    stepX = warped.shape[1] // 9
    stepY = warped.shape[0] // 9
    cellLocs = []
    for y in range(0, 9):
        row = []
        for x in range(0, 9):
            startX = x * stepX
            startY = y * stepY
            endX = (x + 1) * stepX
            endY = (y + 1) * stepY
            row.append((startX, startY, endX, endY))
        cellLocs.append(row)
    print('cellLocs computed')
    return cellLocs
	
def annotate(unsolved, solved, cellLocs, puzzleImage):
    print('Annotating...')
    for i in range(9):
        for j in range(9):
            if unsolved[i][j] == 0:
                print('Unsolved cell found at: ', i, j)
                textX = int((cellLocs[i][j][2] - cellLocs[i][j][0]) * 0.33)
                textY = int((cellLocs[i][j][3] - cellLocs[i][j][1]) * -0.2)
                textX += cellLocs[i][j][0]
                textY += cellLocs[i][j][3]
                print('writing on image at: ', textX, textY)
                cv2.putText(puzzleImage, str(solved[i][j]), (textX, textY),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 240, 0), 2)
    print('Annotation done')
    return puzzleImage

# imgTobe = cv2.imread('received_images/received_image.jpg')
# imgTobe = imutils.resize(imgTobe, width=600)
# (puzzleImage, warped) = find_puzzle(imgTobe, debug=0)
# cellLocs = cellLocFind(warped)
# annotated = annotate(unsolved, solved, cellLocs, puzzleImage)
# cv2.imwrite('mannotate.png', annotated)