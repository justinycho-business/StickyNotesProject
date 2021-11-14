from app.models import db, Note

    # id = db.Column(db.INTEGER, primary_key=True)
    # name = db.Column(db.VARCHAR, nullable=False)
    # content = db.Column(db.VARCHAR, nullable=False)
    # completed = db.Column(db.BOOLEAN, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    # checklist_id = db.Column(db.INTEGER, db.ForeignKey('checklist.id'), nullable=False)
    # user = db.relationship("User", back_populates="bullet")
    # checklist = db.relationship("Checklist", back_populates="bullet")
# Adds a demo user, you can add other users here if you want
def seed_notes():
    note0 = Note(
        title = 'note_zero',
        board_id = 1,
        content = "first note",
        color = "yellow",
        x=0,
        y=0,

        )
    note1 = Note(
        title = 'note_one',
        board_id = 1,
        content = "second note",
        color = "blue",
        x=0,
        y=0,
        )

    note2 = Note(
        title = 'note_two',
        board_id = 1,
        content = "third note",
        color = "red",
        x=0,
        y=0,
        )


    db.session.add(note0)
    db.session.add(note1)
    db.session.add(note2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
