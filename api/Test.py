from flask import Flask

app = Flask(__name__)

@app.route('/api/Test')
def test():
    return 'test'