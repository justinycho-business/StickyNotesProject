from app.models import db, Image

    # id = db.Column(db.INTEGER, primary_key=True)
    # name = db.Column(db.VARCHAR, nImageullable=False)
    # user_id = db.Column(db.INTEGER, db.ForeignKey('user.id'), nullable=False)
    # user = db.relationship("User", back_populates="list")

# Adds a demo user, you can add other users here if you want
def seed_images():
    image0 = Image(
        title='image0',
        board_id=1,
        imageURL = 'https://static.wikia.nocookie.net/googology/images/c/c0/Zero.jpg/revision/latest?cb=20180112064134'
        )
    image1 = Image(
        title='image1',
        board_id=1,
        imageURL = 'https://www.edupics.com/image-number-1-dm20182.jpg'
        )
    image2 = Image(
        title='image2',
        board_id=2,
        imageURL = "https://www.edupics.com/image-number-2-b-dm20181.jpg"
        )

    db.session.add(image0)
    db.session.add(image1)
    db.session.add(image2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
