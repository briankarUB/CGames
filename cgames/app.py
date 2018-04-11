import os
import textwrap

from flask import Flask, abort, render_template
from jinja2 import TemplateNotFound

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'development key')

# Jinja2 configuration
app.jinja_env.globals.update(dedent=textwrap.dedent, print=print)
app.jinja_env.add_extension('jinja2.ext.do')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/assignments')
def assignments():
    return render_template('assignments.html')


@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')


@app.route('/assignments/<int:n>')
def assignment_page(n):
    filename = 'assignments/{!s}.html'.format(n)

    try:
        return render_template(filename)
    except TemplateNotFound:
        return abort(404)
