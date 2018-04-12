from flask import Flask, abort, render_template, g, request
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


@app.route('/submit_score', methods=['POST'])
def submit_score():
    name = request.form['name']
    score = int(request.form['score'])
    quiz = int(request.form['quiz'])

    if not (score in range(0, 100) and quiz in range(1, 2)):
        return "Nice try", 403

    player_scores = board.get(name, {})
    player_scores.update({quiz: score})
    board.update({name: player_scores})


@app.route('/assignments/<int:n>')
def assignment_page(n):
    filename = 'assignments/{!s}.html'.format(n)

    try:
        return render_template(filename)
    except TemplateNotFound:
        return abort(404)
