from marshmallow import Schema, fields


class TrainSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    speed = fields.Float(required=True)
    route_id = fields.Int(required=True)
    capacity = fields.Int(required=True)
    maintenance = fields.Str(required=True)


class TrainUpdateSchema(Schema):
    name = fields.Str(required=False, allow_none=True, description="Updated name of the train.")
    speed = fields.Float(required=False, allow_none=True, description="Updated speed of the train.")
    route_id = fields.Int(required=False, allow_none=True, description="Updated route ID of the train.")
    capacity = fields.Int(required= False, allow_none=True, description=("update capacity of the train"))
    maintenance=fields.Str(required = False , allow_non=True, description=("Update the maintenance status of the train"))

class StationSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)

class RouteSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    source_station = fields.Str(required=True)
    destination_station = fields.Str(required=True)
    duration = fields.Float(required=True)  # Duration in minutes
    stations = fields.List(fields.Str(), required=True) 

class RouteUpdateSchema(Schema):
    name = fields.Str(required=False, allow_none=True, description="Updated name of the route.")
    source_station= fields.Str(required=False , allow_none=True , description= "Update the source station")
    destination_station= fields.Str(required=False , allow_none=True , description= "Update the destination station")
    duration = fields.Int(required = False , allow_none = True , description = "Update the duration")
   

class RouteStationSchema(Schema):
    route_id = fields.Int(required=True)
    station_id = fields.Int(required=True)
    sequence = fields.Int(required=True)