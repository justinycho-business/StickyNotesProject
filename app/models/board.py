from .db import db

class Board(db.Model):
    __tablename__ = 'board'

    id = db.Column(db.INTEGER, primary_key=True)
    name = db.Column(db.VARCHAR, nullable=False)

    def to_dict(self):
        return {
              'id': self.id,
              'name': self.name,

            }
