from flask import Flask

app = Flask(__name__)

@app.route('/api/utils/testApi2')
def testApi2():
    return 'testApi2'

if __name__=='__main__':
    app.run()