import os
import openai
import requests
from flask import Flask, request
from flask_cors import CORS

openai.organization = "org-ZzIF6FtgnLnukWYaOcPPqn16"
openai.api_key = "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"
openai.Model.list()

app = Flask(__name__)
CORS(app)

# openAi example
def openAi(promptText="Tell me that I didn't insert a valid text"):
    response = openai.Completion.create(
        model='text-davinci-002',
        prompt=promptText,
        max_tokens=500,
        temperature=0.8
    )
    print(response.choices[0].text)

@app.route('/api/utils/openAi', methods=['GET'])
def openAiApi():
    # Access the query parameters from the GET request
    prompt = request.args.get('prompt')
    print(prompt)
    response = openAi(prompt)
    return ('hello')