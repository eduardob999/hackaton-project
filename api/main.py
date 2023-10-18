from flask import Flask

app = Flask(__name__)

@app.route('/api/main')
def test():
    return 'test'