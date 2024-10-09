from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
import os
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    # Update CORS settings for preflight requests
    CORS(app, resources={r"/api/*": {
        "origins": "https://expense-tracker-topaz-rho.vercel.app",
        # "origins":"http://localhost:3000",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "X-Requested-With", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers"],
        "supports_credentials": True,
    }})
    # Set a different path for the instance folder or use a temporary directory
    app.instance_path = os.getenv("INSTANCE_PATH", "/tmp")

    # Load configurations from config.py
    app.config.from_object('config.Config')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail = Mail(app)  # Initialize Flask-Mail with the app

    # Register blueprints (routes)
    from app.routes import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    # Avoid creating the instance folder if it doesn't exist
    if not os.path.exists(app.instance_path):
        app.instance_path = "/tmp"  # Use the temporary directory
        
    with app.app_context():
        db.create_all()  # This will create the tables

        
    @app.after_request
    def apply_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "https://expense-tracker-topaz-rho.vercel.app"  # Allowed frontend origin
        # response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"  # Allowed frontend origin
        response.headers["Access-Control-Allow-Credentials"] = "true"  # Allow credentials (cookies, etc.)
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"  # Allowed headers
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"  # Allowed methods
        return response
    return app