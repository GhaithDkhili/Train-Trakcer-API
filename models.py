
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db= SQLAlchemy()


class Train(db.Model):
    __tablename__ = "Train"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    speed = db.Column(db.Float, nullable=True)
    capacity = db.Column(db.Integer, nullable=True)
    maintenance = db.Column(db.String, nullable=True)
    route_id = db.Column(db.Integer, db.ForeignKey("Route.id"), nullable=False)


class Station(db.Model):
    __tablename__ = "Station"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

class Route(db.Model):
    __tablename__ = "Route"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    source_station = db.Column(db.String, nullable=False)
    destination_station = db.Column(db.String, nullable=False)
    duration = db.Column(db.Float, nullable = False)  # Duration in minutes
    stations = db.relationship('Station', secondary='route_station', backref='routes')

class RouteStation(db.Model):
    __tablename__ = 'route_station'
    route_id = db.Column(db.Integer, db.ForeignKey("Route.id"), primary_key=True)
    station_id = db.Column(db.Integer, db.ForeignKey("Station.id"), primary_key=True)
    sequence = db.Column(db.Integer, nullable=False)


