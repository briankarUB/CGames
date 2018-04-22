# CGames
[![Travis](https://img.shields.io/travis/briankarUB/CGames/develop.svg)](https://travis-ci.org/briankarUB/CGames)
[![Requires.io](https://img.shields.io/requires/github/briankarUB/CGames/develop.svg)](https://requires.io/github/briankarUB/CGames/requirements/?branch=develop)
[![Gitter](https://img.shields.io/gitter/room/CGames_CSE442/Lobby.svg)](https://gitter.im/CGames_CSE442/Lobby)  
CSE 442 project for Spring 2018.
## Beta Release Link
https://cgames-cse442.herokuapp.com/
## Beta Video Link
https://youtu.be/AgTihH1utQI

## Prototype link
https://www.youtube.com/watch?v=gKoA1O_O3Zs

## Summary

### User story
I want a way to learn a programming language that is more simple than existing manuals and reinforced through activities to guage my progress.

### Minimal Viable Product (MVP)
We want the user to be able to press a button and then enter an activity where
questions are asked regarding different python coding concepts. The user is
rewarded for correct answers and can select which lessons to complete.
We want to incorporate a global leaderboard so the user can compare scores with other users.

### Add-on features
1. Globe feature where each continent represents a different concept in Python
and each major city is a level. The user must visit every connecting city to
"beat" the continent and progress to the next one.
2. Incorporate more programming languages -- at first, our web app will only
give the option to learn one programming language (Python), additional
languages could be added to the web app later.
3. Ability to share a highscore to a social media account.

## Get started
### Python setup
CGames requires Python 3.5+ to run. Head to the 
[Python website](https://www.python.org/downloads/) to install it before
moving on to the next step. It's recommended that you add Python to your
PATH so that the `python` interpreter can be seamlessly called from any 
terminal window. 

### CGames setup
To jump right into development, clone the project and run either `run.bat` or
`run.sh`, depending on your operating system. This will perform initial
installation and start a Flask web server running CGames.

However, we recommend that you use [JetBrains PyCharm](https://www.jetbrains.com/pycharm/)
when contributing to CGames, as CGames has been built from the ground up using
PyCharm. Clone the project using PyCharm (as a new project) and everything
should Just Work.
