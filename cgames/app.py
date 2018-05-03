import os
import textwrap
from flask import Flask, abort, render_template, request, make_response
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
    summed_board = {k: sum(v.values()) for k, v in board.items()}
    items = sorted(summed_board.items(), key=lambda t: t[1], reverse=True)
    username = request.cookies.get('username')

    return render_template(
        'leaderboard.html',
        leaderboard_items=items,
        username=username
    )


@app.route('/submit_score', methods=['POST'])
def submit_score():
    name = request.form['name'][0:10]
    score = int(request.form['score'])
    quiz = int(request.form['quiz'])

    if not (score in range(0, 101) and quiz in range(1, 4)):
        return 'Nice try', 403

    player_scores = board.get(name, {})
    player_scores.update({quiz: score})
    board.update({name: player_scores})

    resp = make_response('', 200)
    resp.set_cookie('username', name)
    return resp


@app.route('/assignments/<int:n>')
def assignment_page(n):
    filename = 'assignments/{!s}.html'.format(n)

    try:
        return render_template(filename)
    except TemplateNotFound:
        return abort(404)
