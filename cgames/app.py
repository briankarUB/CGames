from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = 'development key'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/assignments')
def assignments():
    return render_template('assignments.html')


@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')
