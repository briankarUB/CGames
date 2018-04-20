import os
import textwrap
from flask import Flask, abort, render_template, request
from jinja2 import TemplateNotFound

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'development key')

# Jinja2 configuration
app.jinja_env.add_extension('jinja2.ext.do')
app.jinja_env.filters['dedent'] = lambda s: textwrap.dedent(s.lstrip('\n'))

board = {}


def next_lesson():
    *_, n = request.path.rpartition('/')
    return int(n) + 1


app.jinja_env.globals.update(next_lesson=next_lesson)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/assignments')
def assignments():
    return render_template('assignments.html')


@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html', leaderboard=board)


@app.route('/submit_score', methods=['POST'])
def submit_score():
    print(request.form)

    name = request.form['name']
    score = int(request.form['score'])
    quiz = int(request.form['quiz'])
    """
    if not (score in range(0, 101) and quiz in range(1, 2)):
        print('nice try')
        return "Nice try", 403"""
    player_scores = board.get(name, {})
    player_scores.update({quiz: score})

    quizfile = 'cgames/templates/assignments/{!s}.html'.format(quiz) #where quizzes are it can be varied if you run it on server. This is based on address of run.bat in my local#
    if os.path.isfile(quizfile) and score in range(0, 101):
        #check whether name is in leaderboard
        for original in list(board.keys()): #find name in leaderboard
            if original.lower() == name.lower():
                board.update({original: player_scores})
                return 'Scored!', 200
        else:
            board.update({name: player_scores})
    else :
        return "Nice try", 403

    print(board)
    return 'Scored!', 200


@app.route('/assignments/<int:n>')
def assignment_page(n):
    filename = 'assignments/{!s}.html'.format(n)

    try:
        return render_template(filename)
    except TemplateNotFound:
        return abort(404)
