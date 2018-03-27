@echo off

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
