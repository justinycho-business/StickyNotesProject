from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board, Note
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

@board_routes.route('/notes/<int:boardid>')
@login_required
def getnotes(boardid):
    notes = Note.query.filter_by(board_id=boardid).all()

    notesarray = [note.to_dict() for note in notes]

    print(notesarray)
    def myFunc(note):
        return note['id']
    # so sticky notes persist on reload
    notesarray.sort(key=myFunc)
    print(notesarray)
    return {'notes': notesarray}

@board_routes.route('/notes/notecreate/<int:boardid>', methods=['POST'])
@login_required
def notecreate(boardid):
    # step 1
    note_to_create = Note(
        title = 'New Note',
        board_id = boardid,
        content = "New Note",
        color = "yellow",
        x=0,
        y=0,
    )

    # step 2
    db.session.add(note_to_create)
    #step 3
    db.session.commit()
    print("note created")
    notes = Note.query.filter_by(board_id=boardid).all()
    notesarray = [note.to_dict() for note in notes]

    def myFunc(note):
        return note['id']
    # so sticky notes persist on reload
    notesarray.sort(key=myFunc)

    print("=====================note created", notesarray)
    return {'notes': notesarray}

@board_routes.route('/notes/notedelete/<int:noteid>', methods=['DELETE'])
@login_required
def notedelete(noteid):
    request_data_body = request.get_json()
    board_id = request_data_body['board_id']
    note_to_dlt = Note.query.filter_by(id = noteid).first()
    # step 2
    db.session.delete(note_to_dlt)
    #step 3
    db.session.commit()
    notes = Note.query.filter_by(board_id=board_id).all()
    notesarray = [note.to_dict() for note in notes]

    def myFunc(note):
        return note['id']
    # so sticky notes persist on reload
    notesarray.sort(key=myFunc)

    print("=====================note created", notesarray)
    return {'notes': notesarray}

@board_routes.route('/notes/noteedit/<int:note_id>', methods=['PUT'])
@login_required
def noteedit(note_id):
    request_data_body = request.get_json()
    noteid_fromjson = request_data_body['noteid']
    color_fromjson = request_data_body['color']
    title_fromjson = request_data_body['title']
    content_fromjson = request_data_body['content']
    boardid_fromjson = request_data_body['board_id']

    note_to_change = Note.query.get(noteid_fromjson)
    print("==============", note_to_change)
    note_to_change.content = content_fromjson
    note_to_change.title = title_fromjson
    note_to_change.color = color_fromjson

    db.session.commit()

    notes = Note.query.filter_by(board_id=boardid_fromjson).all()
    notesarray = [note.to_dict() for note in notes]

    def myFunc(note):
        return note['id']
    # so sticky notes persist on reload
    notesarray.sort(key=myFunc)

    print("=====================note edited", notesarray)
    return {'notes': notesarray}

@board_routes.route('/notes/notepositionchange/<int:note_id>', methods=['PUT'])
@login_required
def notepositionchange(note_id):
    request_data_body = request.get_json()
    noteid_fromjson = request_data_body['noteid']
    x_fromjson = request_data_body['x']
    y_fromjson = request_data_body['y']

    note_to_change = Note.query.get(noteid_fromjson)

    note_to_change.x = x_fromjson
    note_to_change.y = y_fromjson

    db.session.commit()

    note_to_display = Note.query.filter_by(id=noteid_fromjson).all()
    note_dict = [note.to_dict() for note in note_to_display]


    return {'notechanged': note_dict}
