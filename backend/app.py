from flask import Flask, request, jsonify
import base64
from PIL import Image
from io import BytesIO
import os
from processor import process
from classifier import classify

app = Flask(__name__)


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
        classified_list = classify(processed_image)
        print(classified_list)

        return jsonify({'message': 'Image received and recognized successfully'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
