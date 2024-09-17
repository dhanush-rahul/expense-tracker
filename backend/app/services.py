from flask import jsonify
from app.models import Expense, db
from datetime import datetime

def create_expense(data, user_id):
    try:
        new_expense = Expense(
            amount=data.get('amount'),
            category=data.get('category'),
            date=datetime.strptime(data.get('date'), '%Y-%m-%d'),
            user_id=user_id
        )
        db.session.add(new_expense)
        db.session.commit()
        return jsonify({'message': 'Expense created successfully'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500


def update_expense(expense_id, data, user_id):
    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
    if not expense:
        return jsonify({'message': 'Expense not found'}), 404

    expense.amount = data.get('amount', expense.amount)
    expense.category = data.get('category', expense.category)
    expense.date = datetime.strptime(data.get('date', str(expense.date)), '%Y-%m-%d')
    db.session.commit()

    return jsonify({'message': 'Expense updated successfully'}), 200


def delete_expense(expense_id, user_id):
    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
    if not expense:
        return jsonify({'message': 'Expense not found'}), 404

    db.session.delete(expense)
    db.session.commit()

    return jsonify({'message': 'Expense deleted successfully'}), 200
