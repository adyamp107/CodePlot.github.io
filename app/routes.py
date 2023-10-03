from app import app
from flask import render_template, send_file, request, jsonify
from ai import ai

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
    return render_template('home.html', title='CodePlay')

@app.route('/chat', methods=['GET'])
def chat():
    return render_template('chat.html', title='Chat AI')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html', title='About Us')

@app.route('/run-ai', methods=['POST'])
def run_ai():
    data = request.get_json()
    answer = ai.get_answer(data)
    return jsonify(answer)