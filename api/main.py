from flask import Flask
from Test import *

app = Flask(__name__)

@app.route('/api/main')
def apiMain():
    return 'main'

@app.route('/api/test')
def apiTest():
    answer = test()
    return answer