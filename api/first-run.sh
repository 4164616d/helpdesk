#!/bin/sh
pipenv --three
pipenv install
export FLASK_APP=./src/index.py
source $(pipenv --venv)/bin/activate
flask run -h 0.0.0.0