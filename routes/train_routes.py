# File: routes/train_routes.py
from flask import  jsonify, request
from models import  Train
from models import db
from schemas import TrainSchema, TrainUpdateSchema
from flask.views import MethodView
from flask_smorest import abort ,Blueprint
from sqlalchemy.exc import SQLAlchemyError

train_routes = Blueprint('train_routes', __name__, description = "Operations on trains")

@train_routes.route("/trains")
class TrainAPI(MethodView):
    @train_routes.response(200, TrainSchema(many=True))
    def get(self):
        return Train.query.all()

    @train_routes.arguments(TrainSchema)
    @train_routes.response(201, TrainSchema)
    def post(self, train_data):
        train = Train(**train_data)
        try:
            db.session.add(train)
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="An error occurred while inserting the train.")
        return train
    

@train_routes.route("/trains/<int:train_id>")
class TrainDetailAPI(MethodView):
    @train_routes.response(200, TrainSchema)
    def get(self, train_id):
        train = Train.query.get(train_id)
        if not train:
            abort(404, message="Train not found.")
        return train

    @train_routes.arguments(TrainUpdateSchema)
    @train_routes.response(200, TrainSchema)
    def put(self, train_data, train_id):
        train = Train.query.get(train_id)
        if not train:
            abort(404, message="Train not found.")
        
        train.speed = train_data.get("speed", train.speed)
        train.name = train_data.get("name" , train.name)
        train.maintenance = train_data.get("maintenance", train.maintenance)
        train.route_id = train_data.get("route_id", train.route_id)
        
        try:
            db.session.commit()
        except SQLAlchemyError:
            db.session.rollback()
            abort(500, message="An error occurred while updating the train.")
        
        return train
    def delete(self, train_id):
        train = Train.query.get_or_404(train_id)
        db.session.delete(train)
        db.session.commit()
        return {"message": "train deleted."}