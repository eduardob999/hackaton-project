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
def openAi(text="(the user didn't insert any text)", prompt="tell the user that he needs to make a question about the text"):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        max_tokens=3000,
        temperature=0.8,
        messages = [{"role": "system", "content" : "You are IntiTex Ai, a large language model trained to resume and translate documents. Answer as concisely as possible, and strictly in spanish. The chat is meant to respond just a single question.\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-03-02"},
        {"role": "user", "content" : text},
        {"role": "assistant", "content" : "¿Que quieres que haga con ese texto?"},
        {"role": "user", "content" : prompt}]
    )
    return(response.choices[0].message.content)


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

    if single_property is not None and len(single_property) != 0:
        # Return the extracted property
        return single_property
    else:
        return 'Error: el archivo cargado parece no cumplir con los requisitos solicitados.'

@app.route('/api/utils/openAi', methods=['GET'])
def openAiApi():
    # Access the query parameters from the GET request
    text = request.args.get('text')
    prompt = request.args.get('prompt')
    response = openAi(text, prompt)
    return (response)

if __name__ == '__main__':
    app.run()