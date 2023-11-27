from flask import Flask, request, jsonify
import base64
from PIL import Image
from io import BytesIO
import os

app = Flask(__name__)


@app.route('/home', methods=['GET'])
def home():
    return jsonify({'message': 'Hello World'}), 200


UPLOAD_FOLDER = 'received_images'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/solve_picture', methods=['POST'])
async def process_image():
    try:
        data = request.json()
        image_data = data.get('imageData')

        print(data)
        image_bytes = await base64.b64decode(image_data)

        image = Image.open(BytesIO(image_bytes))
        

        save_path = os.path.join(app.config['UPLOAD_FOLDER'], 'received_image.jpg')
        image.save(save_path)

        return jsonify({'message': 'Image received and saved successfully', 'savedImagePath': save_path})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
