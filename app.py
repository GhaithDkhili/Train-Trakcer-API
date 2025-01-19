# File: app.py
from flask import Flask
from models import db
from routes.train_routes import train_routes 
from routes.station_routes import station_routes
from routes.route_routes import route_routes
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from flask_smorest import Api

# Initialize Flask app
def create_app(db_url=None):
    app = Flask(__name__)
    CORS(app)
    app.config["PROGPAGATE_EXCEPTION"]= True
    app.config["API_TITLE"]= "Train Tracker REST API"
    app.config["API_VERSION"]= "RELEASE 1"
    app.config["OPENAPI_VERSION"]= "3.0.3"
    app.config["OPENAPI_URL_PREFIX"]= "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"]= "/swagger-ui"    
    app.config["OPENAPI_SWAGGER_UI_URL"]= "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config['SQLALCHEMY_DATABASE_URI'] =  'sqlite:///train_tracker.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy

    db.init_app(app)

# Register blueprints

    api = Api(app)


    with app.app_context():
            db.create_all() 
    api.register_blueprint(train_routes)
    api.register_blueprint(station_routes)
    api.register_blueprint(route_routes)

    return app
