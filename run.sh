#!/usr/bin/env sh

# Your Google OAuth 2.0 credentials go here
export GOOGLE_OAUTH_CLIENT_ID="your client id"
export GOOGLE_OAUTH_CLIENT_SECRET="your client secret"

# Required when running the web server without HTTPS support
export OAUTHLIB_INSECURE_TRANSPORT=1

# Don't modify unless you know what you're doing
export FLASK_APP="cgames/app.py"

# Create and activate the virtual environment
python3 -m virtualenv venv
source venv/bin/activate
pip3 install -U setuptools

# Install the project into the virtual environment
python3 setup.py install

# Run the project
python3 -m flask run
