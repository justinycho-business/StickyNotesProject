from flask.cli import AppGroup
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards
from .images import seed_images, undo_images
from .notes import seed_notes, undo_notes
from ..models.db import db
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    db.create_all()
    seed_users()
    seed_boards()
    seed_images()
    seed_notes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_boards()
    undo_images()
    undo_notes()
    # Add other undo functions here
