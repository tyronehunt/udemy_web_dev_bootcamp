from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# Initiate SQLAlchemy Database
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Can call the datbase anything, but convention is database.db
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

    # Initiate the app inside the database object
    db.init_app(app)

    # Register App Views
    from api.views.views import main
    app.register_blueprint(main)

    return app

