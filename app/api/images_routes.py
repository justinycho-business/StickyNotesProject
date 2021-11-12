from flask import Blueprint, json, jsonify, request
from app.models import User, db, Board
from flask_login import login_required
from sqlalchemy.sql import func
# import requests
import os

images_routes = Blueprint('images', __name__)

@images_routes.route('/')
@login_required
def getuserboards(userid):

    pass
