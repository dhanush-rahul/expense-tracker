# expense-tracker
Expense Tracker with Monthly Reports

Allows users to:
1. Add daily expenses (with category like food, transport etc)
2. View a list of their expenses.
3. Filter expenses by date or category
4. Generate monthly reports showing total expenses by category
5. Track spending trends over time.

**Tech Stack:**
1. Frontend - React.js
2. Backend - Python (Flask) for API development
3. Database - Flask
4. Authentication - JWT for secure user authentication

Backend Setup:

1. python3 -m venv venv
2. venv\Scripts\activate
3. pip install flask flask-jwt-extended flask-sqlalchemy flask-migrate flask_cors
4. flask db init
5. flask db migrate
6. flask db upgrade
7. python run.py
