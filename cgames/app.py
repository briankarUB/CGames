from flask import Flask, redirect, url_for, render_template, jsonify
from flask_dance.contrib.google import make_google_blueprint, google
import os

'''
    connecting to google OAuth
    source tutorial: https://pythonspot.com/login-to-flask-app-with-google
'''

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_OAUTH_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_OAUTH_CLIENT_SECRET')
REDIRECT_URI = '/oauth2callback'
SECRET_KEY = 'development key'
DEBUG = True

app = Flask(__name__)
app.debug = DEBUG
app.secret_key = SECRET_KEY

blueprint = make_google_blueprint(
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    scope=['email', 'profile']
)
app.register_blueprint(blueprint, url_prefix='/login')

'''
    the function save is the template for saving the user, a table will have to
    be set up with the user info and stats
'''


def save(user):
    print(user)


'''
    this is the homepage; all it does is renders the index.html file
'''


@app.route("/")
def index():
    return render_template('home.html')


'''
    when the sign in button or link is clicked, this function runs
    here is where the OAuth is requested and if completed returns
    a bytes array of user information which is then converted into a dictonary
    then a template profile page is shown profile.html with a name and image
'''


@app.route('/Assignments')
def assignments():
    return render_template('assignments.html')


@app.route('/Home')
def signin():
    if not google.authorized:
        return redirect(url_for('google.login'))

    # print(help(google.close))

    resp = google.get('/oauth2/v2/userinfo')
    assert resp.ok, resp.text

    d = resp.json()

    return render_template('userhome.html',
                           vname=d['name'],
                           photo=d['picture'],
                           email=d['email'],
                           vid=d['id']
                           )


'''


    main runs the app
'''


@app.route('/profile')
def profile():
    if not google.authorized:
        return redirect(url_for('google.login'))

    resp = google.get('/oauth2/v2/userinfo')
    assert resp.ok, resp.text

    return jsonify(resp.json())


@app.route('/Leaderboard')
def leaderboard():
    return render_template('leaderboard.html')


"""
    Leaderboard Page
"""


def main():
    app.run()


if __name__ == '__main__':
    main()
