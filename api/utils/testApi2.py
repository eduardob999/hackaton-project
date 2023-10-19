from flask import Flask
from flask_cors import CORS
import replicate
replicate = replicate.Client(api_token='r8_ZIcN3hbxyVhxpiGBYDSpGNCmAGjYKo804PiQx')

app = Flask(__name__)
CORS(app)

@app.route('/api/utils/testApi2')
def testApi2():
    output = replicate.run(
        "meta/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
        input={"prompt": "Say hello"}
    )
    # The meta/llama-2-70b-chat model can stream output as it's running.
    # The predict method returns an iterator, and you can iterate over that output.
    result = ''
    for item in output:
        result = result + item
        print(item)
    return result

if __name__=='__main__':
    app.run()