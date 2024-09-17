from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from app.models import User, Expense, db
from app.services import create_expense, update_expense, delete_expense

api_bp = Blueprint('api', __name__)

# User Authentication Routes
@api_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@api_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 200


# Expense Management Routes
@api_bp.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()
    return jsonify([expense.to_dict() for expense in expenses]), 200


@api_bp.route('/expenses', methods=['POST'])
@jwt_required()
def add_expense():
    data = request.json
    user_id = get_jwt_identity()
    return create_expense(data, user_id)


@api_bp.route('/expenses/<int:id>', methods=['PUT'])
@jwt_required()
def edit_expense(id):
    data = request.json
    user_id = get_jwt_identity()
    return update_expense(id, data, user_id)


@api_bp.route('/expenses/<int:id>', methods=['DELETE'])
@jwt_required()
def remove_expense(id):
    user_id = get_jwt_identity()
    return delete_expense(id, user_id)
