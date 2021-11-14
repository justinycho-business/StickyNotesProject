from .db import db

class Note(db.Model):
    __tablename__ = 'note'

    id = db.Column(db.INTEGER, primary_key=True)
    title = db.Column(db.VARCHAR, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    board_id = db.Column(db.INTEGER, db.ForeignKey('board.id'), nullable=False)
    # user = db.relationship("User", back_populates="list")
    content = db.Column(db.VARCHAR, nullable=False)
    color = db.Column(db.VARCHAR, nullable=False)
    # card = db.relationship("Card", back_populates="list", cascade="all, delete-orphan")
    x = db.Column(db.INTEGER, nullable=False)
    y = db.Column(db.INTEGER, nullable=False)
    def to_dict(self):
            return {
              'id': self.id,
              'title': self.title,
              'content': self.content,
              # 'user_id': self.user_id,
              'board_id': self.board_id,
              'color': self.color,
              'x': self.x,
              'y': self.y
            }
