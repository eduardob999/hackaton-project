from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/utils/testApi1')
def testApi1():
    return 'testApi1'

if __name__=='__main__':
    app.run()