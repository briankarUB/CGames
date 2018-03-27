#!/usr/bin/env sh

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
