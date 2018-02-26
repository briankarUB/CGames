@echo off

REM Your Google OAuth 2.0 credentials go here
set GOOGLE_OAUTH_CLIENT_ID=your client id
set GOOGLE_OAUTH_CLIENT_SECRET=your client secret

REM Required when running the web server without HTTPS support
set OAUTHLIB_INSECURE_TRANSPORT=1

REM Don't modify unless you know what you're doing
set FLASK_APP=cgames/app.py

REM Create and activate the virtual environment
python -m venv venv
call .\venv\Scripts\activate
pip install -U setuptools

REM Install the project into the virtual environment
python setup.py install

REM Run the project
python -m flask run
