from flask import Flask, render_template, jsonify, request
from ai_compliment import get_compliment
import os

app = Flask(__name__)

@app.route("/")
def renter_login_page():
    return render_template('login.html')

@app.route("/login", methods = ['POST'])
def try_login():
    print(request.form['email'])
    if request.form['email'] == os.getenv("IMPORTANT_MAIL"):
        return render_template('index.html')
    if request.form['email'] == os.getenv("SNAKE_MAIL"):
        return render_template('snake.html')
    else:
        return render_template('wrong_password.html')

@app.route("/snake")
def play_sanke():
    return render_template('snake.html')



@app.route('/api/get_custom_compliment', methods=['GET'])
def get_custom_text():
    return jsonify({"custom_text": get_compliment()})