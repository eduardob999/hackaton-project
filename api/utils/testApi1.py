from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/utils/testApi1', methods=['GET'])
def testApi1():
    # Access the query parameters from the GET request
    param1 = request.args.get('param1')
    param2 = request.args.get('param2')

    # Print the query parameter

    return (f'param1: {param1}, param2: {param2}')

if __name__ == '__main__':
    app.run()
