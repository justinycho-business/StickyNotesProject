"""empty message

Revision ID: 6832c7602d54
Revises: 
Create Date: 2021-11-14 19:40:43.402761

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6832c7602d54'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('board',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('name', sa.VARCHAR(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('image',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(), nullable=False),
    sa.Column('board_id', sa.INTEGER(), nullable=False),
    sa.Column('imageURL', sa.VARCHAR(), nullable=False),
    sa.Column('x', sa.INTEGER(), nullable=False),
    sa.Column('y', sa.INTEGER(), nullable=False),
    sa.Column('width', sa.INTEGER(), nullable=False),
    sa.Column('height', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['board_id'], ['board.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('note',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('title', sa.VARCHAR(), nullable=False),
    sa.Column('board_id', sa.INTEGER(), nullable=False),
    sa.Column('content', sa.VARCHAR(), nullable=False),
    sa.Column('color', sa.VARCHAR(), nullable=False),
    sa.Column('x', sa.INTEGER(), nullable=False),
    sa.Column('y', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['board_id'], ['board.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('note')
    op.drop_table('image')
    op.drop_table('user')
    op.drop_table('board')
    # ### end Alembic commands ###