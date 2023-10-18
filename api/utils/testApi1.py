from flask import Flask

app = Flask(__name__)

@app.route('/api/utils/testApi1')
def testApi1():
    return 'testApi1'

if __name__=='__main__':
    app.run()