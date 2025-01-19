# File: routes/route_routes.py
from flask import jsonify
from models import Route, Station , RouteStation
from models import db
from schemas import RouteSchema , RouteUpdateSchema
from flask.views import MethodView
from flask_smorest import abort ,Blueprint
from sqlalchemy.exc import SQLAlchemyError

route_routes = Blueprint('route_routes', __name__, description = "Operations on routes")


@route_routes.route("/routes")
class Routes(MethodView):
    @route_routes.response(200, RouteSchema(many=True))
    def get(self):
        return Route.query.all()

    @route_routes.arguments(RouteSchema)
    @route_routes.response(201, RouteSchema)
    def post(self, route_data):
        new_route = Route(name=route_data['name'], 
                          source_station=route_data['source_station'],
                          destination_station=route_data['destination_station'],
                          duration=route_data['duration'])
        try:
            db.session.add(new_route)
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="An error occurred while inserting the route.")

        if 'stations' in route_data and isinstance(route_data['stations'], list):
            for station_id in route_data['stations']:
                station = Station.query.get(station_id)
                if not station:
                    db.session.rollback()
                    abort(400, message=f"Station with id {station_id} not found.")

                route_station = RouteStation(
                route_id=new_route.id,
                station_id=station_id,
                sequence=len(route_data['stations'])
                )
                db.session.add(route_station)

            try:
                db.session.commit()
            except SQLAlchemyError:
                db.session.rollback()
                abort(500, message="An error occurred while associating stations with the route.")
        return new_route
    

@route_routes.route("/routes/<int:route_id>")
class RouteDetails(MethodView):
    @route_routes.response(200, RouteSchema)
    def get(self, route_id):
        """Retrieve a route by ID."""
        route = Route.query.get(route_id)
        if not route:
            abort(404, message="Route not found.")
        return route

    @route_routes.arguments(RouteUpdateSchema)
    @route_routes.response(200, RouteSchema)
    def put(self, route_data, route_id):
        """Update a Route by ID."""
        route = Route.query.get(route_id)
        if not route:
            abort(404, message="Route not found.")
        route.name = route_data.get("name", route.name)
        route.source_station = route_data.get("source_station", route.source_station)
        route.destination_station = route_data.get("destination_station", route.destination_station)
        try:
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="An error occurred while updating the Route.")
        
        return route
    def delete(self, route_id):
        route = Route.query.get_or_404(route_id)
        db.session.delete(route)
        db.session.commit()
        return {"message": "Route deleted."}

