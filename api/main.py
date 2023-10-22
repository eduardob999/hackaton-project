from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import os
import openai
import json

openai.organization = "org-ZzIF6FtgnLnukWYaOcPPqn16"
openai.api_key = "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"
openai.Model.list()

# openAi
def openAi(promptText="Tell me that I didn't insert a valid text"):
    response = openai.Completion.create(
        model='text-davinci-002',
        prompt=promptText,
        max_tokens=500,
        temperature=0.8
    )
    return(response.choices[0].text)


# Ocr Api
def ocr_space_file(filename, overlay=False, api_key='K86046359288957', language='eng'):
    """ OCR.space API request with local file.
        Python3.5 - not tested on 2.7
    :param filename: Your file path & name.
    :param overlay: Is OCR.space overlay required in your response.
                    Defaults to False.
    :param api_key: OCR.space API key.
                    Defaults to 'helloworld'.
    :param language: Language code to be used in OCR.
                    List of available language codes can be found on https://ocr.space/OCRAPI
                    Defaults to 'en'.
    :return: Result in JSON format.
    """

    payload = {'isOverlayRequired': overlay,
               'apikey': api_key,
               'language': language,
               }
    with open(filename, 'rb') as f:
        r = requests.post('https://api.ocr.space/parse/image',
                          files={filename: f},
                          data=payload,
                          )
    return r.content.decode()


def ocr_space_url(url, overlay=False, api_key='K86046359288957', language='eng'):
    """ OCR.space API request with remote file.
        Python3.5 - not tested on 2.7
    :param url: Image url.
    :param overlay: Is OCR.space overlay required in your response.
                    Defaults to False.
    :param api_key: OCR.space API key.
                    Defaults to 'helloworld'.
    :param language: Language code to be used in OCR.
                    List of available language codes can be found on https://ocr.space/OCRAPI
                    Defaults to 'en'.
    :return: Result in JSON format.
    """

    payload = {'url': url,
               'isOverlayRequired': overlay,
               'apikey': api_key,
               'language': language,
               }
    r = requests.post('https://api.ocr.space/parse/image',
                      data=payload,
                      )
    return r.content.decode()

# App

app = Flask(__name__)
CORS(app)

@app.route('/api/main')
def apiMain():
    return 'main'

# Imported code

UPLOAD_FOLDER = 'api/uploads'
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

@app.route('/api/utils/ocrApi', methods=['GET'])
def ocrApi():
    # Access the query parameters from the GET request
    name = request.args.get('name')
    lang = request.args.get('lang')

    # Ocr parsing
    response = ocr_space_file(filename='api/uploads/' + name, language=lang)

    # Parse the JSON response
    parsed_response = json.loads(response)

    # Extract the specific property you want (e.g., 'parsed_text' if it exists in the JSON)
    single_property = parsed_response.get('ParsedResults', [])[0].get('ParsedText', None)

    if single_property is not None:
        # Return the extracted property
        return single_property
    else:
        return 'error: Property not found in the JSON response'

@app.route('/api/utils/openAi', methods=['GET'])
def openAiApi():
    # Access the query parameters from the GET request
    prompt = request.args.get('prompt')
    print(prompt)
    response = openAi(prompt)
    return (response)

if __name__ == '__main__':
    app.run()