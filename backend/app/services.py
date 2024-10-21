from flask import jsonify
from app.models import Expense, MonthlyOverview, User, db
from datetime import datetime


def update_monthly_overview(user_id, date, amount_change, is_new_month=False):
    month_str = date.strftime('%Y-%m')
    
    # Fetch the user to get their default monthly_income
    user = User.query.get(user_id)

    # Fetch or create a MonthlyOverview for this month
    monthly_overview = MonthlyOverview.query.filter_by(user_id=user_id, month=month_str).first()
    
    if not monthly_overview:
        # If this is a new month, create a MonthlyOverview with the user's default monthly_income
        monthly_overview = MonthlyOverview(user_id=user_id, month=month_str, spent=0, monthly_income=user.monthly_income)
        db.session.add(monthly_overview)

    # Update the spent field
    monthly_overview.spent += amount_change
    db.session.commit()


def create_expense(data, user_id):
    try:
        # Parse the date
        expense_date = datetime.strptime(data.get('date'), '%Y-%m-%d')

        # Create a new expense
        new_expense = Expense(
            amount=data.get('amount'),
            category=data.get('category'),
            description=data.get('description'),
            date=expense_date,
            user_id=user_id
        )
        db.session.add(new_expense)

        # Update the MonthlyOverview for this month
        update_monthly_overview(user_id, expense_date, new_expense.amount, is_new_month=True)
        
        db.session.commit()
        return jsonify({'message': 'Expense created successfully'}), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500


def update_expense(expense_id, data, user_id):
    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
    if not expense:
        return jsonify({'message': 'Expense not found'}), 404

    try:
        # Get the original date and amount before updating
        original_amount = expense.amount
        original_date = expense.date

        # Parse the new date
        new_date = datetime.strptime(data.get('date', str(expense.date)), '%Y-%m-%d')
        new_amount = data.get('amount', original_amount)

        # Update expense details
        expense.amount = new_amount
        expense.category = data.get('category', expense.category)
        expense.description = data.get('description', expense.description)
        expense.date = new_date
        
        # Adjust spent in the original month (remove the old amount)
        update_monthly_overview(user_id, original_date, -original_amount)
        
        # Adjust spent in the new month (add the new amount)
        update_monthly_overview(user_id, new_date, new_amount, is_new_month=(original_date != new_date))
        
        db.session.commit()
        return jsonify({'message': 'Expense updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


def delete_expense(expense_id, user_id):
    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()
    if not expense:
        return jsonify({'message': 'Expense not found'}), 404

    try:
        # Adjust spent in the corresponding month
        update_monthly_overview(user_id, expense.date, -expense.amount)
        
        # Delete the expense
        db.session.delete(expense)
        db.session.commit()

        return jsonify({'message': 'Expense deleted successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
