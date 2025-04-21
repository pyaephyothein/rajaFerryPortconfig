from flask import Blueprint, jsonify, request
from app.models import Route, Fare, Schedule

api_bp = Blueprint('api', __name__)

@api_bp.route('/routes')
def get_routes():
    service_type = request.args.get('service_type')
    query = Route.query
    if service_type:
        query = query.filter_by(service_type=service_type)
    routes = query.all()
    return jsonify([{
        'id': route.id,
        'name': route.name,
        'start_point': route.start_point,
        'end_point': route.end_point,
        'duration': route.duration,
        'service_type': route.service_type
    } for route in routes])

@api_bp.route('/routes/<route_id>')
def get_route(route_id):
    route = Route.query.get_or_404(route_id)
    fares = Fare.query.filter_by(route_id=route_id).all()
    schedules = Schedule.query.filter_by(route_id=route_id, active=True).all()
    
    return jsonify({
        'route': {
            'id': route.id,
            'name': route.name,
            'start_point': route.start_point,
            'end_point': route.end_point,
            'duration': route.duration,
            'service_type': route.service_type
        },
        'fares': [{
            'ticket_type': fare.ticket_type,
            'price': fare.price
        } for fare in fares],
        'schedules': [{
            'departure_time': schedule.departure_time
        } for schedule in schedules]
    })

@api_bp.route('/availability', methods=['POST'])
def check_availability():
    data = request.get_json()
    route_id = data.get('route_id')
    date = data.get('date')
    passengers = data.get('passengers', 1)
    vehicles = data.get('vehicles', 0)
    
    # In a real app, check actual capacity
    return jsonify({
        'available': True,
        'message': 'Seats available'
    })