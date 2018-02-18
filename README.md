# CGames
[![Travis](https://img.shields.io/travis/briankarUB/CGames.svg)](https://travis-ci.org/briankarUB/CGames)
[![Coveralls](https://img.shields.io/coveralls/github/briankarUB/CGames.svg)](https://coveralls.io/github/briankarUB/CGames)
[![Requires.io](https://img.shields.io/requires/github/briankarUB/CGames.svg)](https://requires.io/github/briankarUB/CGames/requirements/)
[![Join the chat at https://gitter.im/CGames_CSE442/Lobby](https://badges.gitter.im/CGames_CSE442/Lobby.svg)](https://gitter.im/CGames_CSE442/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)  
CSE 442 project for Spring 2018.

## Summary

### User story
I want a way to learn a programming language that is fun and feels like
playing a game.

### Minimal Viable Product (MVP)
We want the user to be able to press a button and then enter a game where
questions are asked regarding different python coding concepts. The user is
rewarded for correct answers and can proceed to the next part of the game upon
meeting a minimum point requirement. We want to incorporate a global
leaderboard so the user can compare scores with other users.

### Add-on features
1. Globe feature where each continent represents a different concept in Python
and each major city is a level. The user must visit every connecting city to
"beat" the continent and progress to the next one.
2. Incorporate more programming languages -- at first, our web app will only
give the option to learn one programming language (Python), additional
languages could be added to the web app later.
3. Ability to share a highscore to a social media account.

## Testing
```
$ git clone https://github.com/briankarUB/CGames.git
$ cd CGames
$ python setup.py validate
```
