from flask import Flask, request
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define the folder where uploaded files will be saved
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/utils/uploadApi', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400

    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        return 'File uploaded successfully', 200

if __name__ == '__main__':
    app.run(debug=True)
