from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

board_routes = Blueprint('board', __name__)

@board_routes.route('/boards')
@login_required
def getuserboards():

    # step 1
    boards = Board.query.all()
    boardarray = []
    for board in boards:
        topush = {}
        topush["id"] = board.id
        topush["name"] = board.name
        boardarray.append(topush)
    #step 2
    # boardarray = [boards.to_dict() for board in boards]
    print(boardarray)

    return {
        "boards": boardarray
    }
