from app import create_app, db  # Import your Flask app and SQLAlchemy db object

# Create an app context so that db knows the app
app = create_app()

with app.app_context():  # Ensure that you are working within the app context
    db.drop_all()  # Drop all the tables
    print("Dropped all tables.")
