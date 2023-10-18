from flask import Flask
from flask_cors import CORS
from api.utils.testApi1 import *
from api.utils.testApi2 import *

app = Flask(__name__)
CORS(app)

@app.route('/api/main')
def apiMain():
    return 'main'

@app.route('/api/utils/testApi1')
def mainApi1():
    return testApi1()

@app.route('/api/utils/testApi2')
def mainApi2():
    return testApi2()

if __name__=='__main__':
    app.run()