from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from app.models import User, Expense, db
from app.services import create_expense, update_expense, delete_expense
import random
from flask_mail import Message
from flask_mail import Mail
from werkzeug.security import generate_password_hash
mail = Mail()
api_bp = Blueprint('api', __name__)

# User Authentication Routes
@api_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('email')
    password = data.get('password')
    monthly_income = data.get('monthlyIncome')
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    new_user.monthly_income = monthly_income
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@api_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not user.check_password(password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity=user.id)
    monthlyIncome = user.monthly_income
    return jsonify({'access_token': access_token, 'monthlyIncome':monthlyIncome}), 200
@api_bp.route('/setUserMonthlyIncome', methods=['POST'])
@jwt_required()
def setUserMonthlyIncome():
    try:
        # Get the current user ID from the JWT
        user_id = get_jwt_identity()
        
        # Get the user based on the user_id
        user = User.query.get(user_id)
        
        # Ensure the user exists
        if not user:
            return jsonify({"message": "User not found"}), 404
        
        # Get the data from the request body
        data = request.get_json()
        monthly_income = int(data.get('monthly_income'))

        # Ensure the monthly income is provided and valid
        if monthly_income is None or monthly_income < 0:
            return jsonify({"message": "Invalid monthly income value"}), 400
        
        print(f"Received monthly income: {monthly_income}")
        print(f"User before update: {user.monthly_income}")
        # Set the user's monthly income
        user.monthly_income = monthly_income

        # Commit the changes to the database
        db.session.commit()

        return jsonify({"message": "Monthly income updated successfully", "monthly_income": monthly_income}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "An error occurred while updating monthly income"}), 500


@api_bp.route('/getUserMonthlyIncome', methods=['GET'])
@jwt_required()
def getUserMonthlyIncome():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        print(f"Received monthly income: {user.monthly_income}")

        return jsonify({'monthly_income': user.monthly_income}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'message': 'An error occurred'}), 200

@api_bp.route('/getCategories', methods=['GET'])
def get_categories():
    CATEGORIES = ['Entertainment', 'Food', 'Utilities', 'Transportation', 'Rent', 'Subscriptions']
    return jsonify(CATEGORIES), 200

# Expense Management Routes
@api_bp.route('/expenses', methods=['GET'])
@jwt_required()
def get_expenses():
    try:
        user_id = get_jwt_identity()
        expenses = Expense.query.filter_by(user_id=user_id).all()

        if not expenses:
            return jsonify({'message': 'No expenses found for this user'}), 200

        return jsonify([expense.to_dict() for expense in expenses]), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'message': 'An error occurred'}), 200


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
otp_storage = {}
# Forgot Password: Send OTP to user's email
@api_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    email = request.json.get('email')
    user = User.query.filter_by(username=email).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Generate a 6-digit OTP
    otp = random.randint(100000, 999999)

    # Store the OTP with the email as the key (expires after some time in a production system)
    otp_storage[email] = otp

    # Send OTP to email (this example uses Flask-Mail)
    try:
        # Setup the email sending logic
        msg = Message(subject="Your OTP for Password Reset",
                      recipients=[email],
                      body=f"Your OTP for resetting your password is {otp}. It will expire in 10 minutes."
                      )
        mail.send(msg)
        return jsonify({"message": "OTP sent to email"}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"message": "Failed to send OTP"}), 500


# Verify OTP
@api_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    email = request.json.get('email')
    otp = request.json.get('otp')

    if email not in otp_storage:
        return jsonify({"message": "No OTP found for this email"}), 404

    # Check if the OTP matches
    if otp_storage.get(email) == int(otp):
        # OTP is valid
        del otp_storage[email]  # Remove OTP after verification
        return jsonify({"verified": True}), 200
    else:
        # Invalid OTP
        return jsonify({"message": "Invalid OTP"}), 400


# Reset Password
@api_bp.route('/reset-password', methods=['POST'])
def reset_password():
    email = request.json.get('email')
    new_password = request.json.get('newPassword')

    user = User.query.filter_by(username=email).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Hash the new password and save it
    user.password_hash = generate_password_hash(new_password)

    try:
        db.session.commit()
        return jsonify({"message": "Password reset successful"}), 200
    except Exception as e:
        print(f"Error resetting password: {e}")
        return jsonify({"message": "Failed to reset password"}), 500
    
@api_bp.route('/api/<path:path>', methods=['OPTIONS'])
def options_handler(path):
    return '',200
