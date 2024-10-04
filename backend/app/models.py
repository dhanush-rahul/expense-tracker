from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Enum

# Define the list of categories
categories = ['Entertainment', 'Food', 'Utilities', 'Transportation', 'Rent', 'Subscriptions']


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    monthly_income = db.Column(db.Float, nullable=True, default=0.0)  # New field for monthly income


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(Enum(*categories, name="category_types"), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('expenses', lazy=True))
    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'category': self.category,
            'description': self.description,
            'date': self.date.strftime('%Y-%m-%d'),
            'user_id': self.user_id
        }