# File: routes/station_routes.py
from flask import  jsonify
from models import Station 
from models import db
from schemas import StationSchema
from flask.views import MethodView
from flask_smorest import abort ,Blueprint
from sqlalchemy.exc import SQLAlchemyError

station_routes = Blueprint('station_routes', __name__, description = "Operatiions on stations")



@station_routes.route("/stations")
class Stations(MethodView):
    @station_routes.response(200, StationSchema(many=True))
    def get(self):
        """Retrieve all stations."""
        return Station.query.all()

    @station_routes.arguments(StationSchema)
    @station_routes.response(201, StationSchema)
    def post(self, station_data):
        """Add a new station."""
        station = Station(**station_data)
        try:
            db.session.add(station)
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
                
        return station
    
@station_routes.route("/stations/<int:station_id>")

class StationDetails(MethodView):
    @station_routes.response(200, StationSchema)
    def get(self, station_id):
        """Retrieve a station by ID."""
        station = Station.query.get(station_id)
        if not station:
            abort(404, message="station not found.")
        return station


    def delete(self, station_id):
        station = Station.query.get_or_404(station_id)
        db.session.delete(station)
        db.session.commit()
        return {"message": "Station deleted."}
