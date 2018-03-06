import os

from flask import Flask, jsonify, redirect, render_template, url_for
from flask_dance.contrib.google import google, make_google_blueprint

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_OAUTH_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_OAUTH_CLIENT_SECRET')

app = Flask(__name__)
app.secret_key = 'development key'

blueprint = make_google_blueprint(
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    scope=['email', 'profile']
)
app.register_blueprint(blueprint, url_prefix='/login')


@app.route('/')
def index():
    return render_template('index.html')


'''
    when the sign in button or link is clicked, this function runs
    here is where the OAuth is requested and if completed returns
    a bytes array of user information which is then converted into a dictonary
    then a template profile page is shown profile.html with a name and image
'''


@app.route('/assignments')
def assignments():
    return render_template('assignments.html')


@app.route('/sign_in')
def sign_in():
    if not google.authorized:
        return redirect(url_for('google.login'))

    resp = google.get('/oauth2/v2/userinfo')
    assert resp.ok, resp.text

    d = resp.json()

    return render_template('userhome.html',
                           vname=d['name'],
                           photo=d['picture'],
                           email=d['email'],
                           vid=d['id'])


@app.route('/profile')
def profile():
    if not google.authorized:
        return redirect(url_for('google.login'))

    resp = google.get('/oauth2/v2/userinfo')
    assert resp.ok, resp.text

    return jsonify(resp.json())


@app.route('/leaderboard')
def leaderboard():
    return render_template('leaderboard.html')
