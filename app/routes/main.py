# filepath: [main.py](http://_vscodecontentref_/10)
from flask import Blueprint, render_template
from app.models import Route

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    # Fetch ferry and bus routes from the database
    ferry_routes = Route.query.filter_by(service_type='ferry').all() or []
    bus_routes = Route.query.filter_by(service_type='bus').all() or []
    
    # Render the index.html template with the fetched data
    return render_template('index.html', ferry_routes=ferry_routes, bus_routes=bus_routes)

@main_bp.route('/sailing-schedule')
def sailing_schedule():
    # Fetch ferry and bus routes for the sailing schedule
    ferry_routes = Route.query.filter_by(service_type='ferry').all() or []
    bus_routes = Route.query.filter_by(service_type='bus').all() or []
    
    # Render the schedule.html template with the fetched data
    return render_template('schedule.html', ferry_routes=ferry_routes, bus_routes=bus_routes)

@main_bp.route('/fare')
def fare():
    # Fetch all routes for the fare page
    routes = Route.query.all() or []
    
    # Render the fare.html template with the fetched data
    return render_template('fare.html', routes=routes)