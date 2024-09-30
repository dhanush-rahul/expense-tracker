from app import app, db  # Import your Flask app and SQLAlchemy db object

with app.app_context():  # Ensure that you are working within the app context
    db.drop_all()  # Drop all the tables
    print("Dropped all tables.")
