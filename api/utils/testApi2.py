from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/utils/testApi2')
def testApi2():
    return 'testApi2'

if __name__=='__main__':
    app.run()