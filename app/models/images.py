from .db import db

class Image(db.Model):
    __tablename__ = 'image'

    id = db.Column(db.INTEGER, primary_key=True)
    title = db.Column(db.VARCHAR, nullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    board_id = db.Column(db.INTEGER, db.ForeignKey('board.id'), nullable=False)
    # user = db.relationship("User", back_populates="list")
    imageURL = db.Column(db.VARCHAR, nullable=False)
    # card = db.relationship("Card", back_populates="list", cascade="all, delete-orphan")
    x = db.Column(db.INTEGER, nullable=False)
    y = db.Column(db.INTEGER, nullable=False)
    def to_dict(self):
            return {
              'id': self.id,
              'title': self.title,
              'imageURL': self.imageURL,
              # 'user_id': self.user_id,
              'board_id': self.board_id,
              'x': self.x,
              'y': self.y
            }
