from flask import Flask, abort, render_template, g
from jinja2 import TemplateNotFound

app = Flask(__name__)
app.secret_key = 'development key'
#board = [["ben","100"],["cory","200"],["matt","300"],["sai","400"],["brain","500"]]
board = {'ben':100,'cory':200,'matt':300,'sai':400,'brian':500}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/assignments')
def assignments():
    return render_template('assignments.html')


@app.route('/assignments/1')
def game():
    return render_template('assignments/1.html')


@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html',leaderboard = board)


@app.route('/assignments/<int:n>')
def assignment_page(n):
    filename = 'assignments/{!s}.html'.format(n)

    try:
        return render_template(filename)
    except TemplateNotFound:
        return abort(404)
