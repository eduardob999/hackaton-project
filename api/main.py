from flask import Flask
from api.utils.Test import *

app = Flask(__name__)

@app.route('/api/main')
def apiMain():
    return 'main'

@app.route('/api/utils/Test')
def apiTest():
    answer = test()
    return answer

if __name__=='__main__':
    app.run()