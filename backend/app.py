from flask import Flask

app = Flask(__name__)
print("TEST", app)

@app.route('/')
def home():
    return "Hello, Flask!"

