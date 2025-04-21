from app import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    phone = db.Column(db.String(20))
    user_type = db.Column(db.String(20), default='customer')  # customer, agent, officer
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    bookings = db.relationship('Booking', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Route(db.Model):
    id = db.Column(db.String(10), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    start_point = db.Column(db.String(100), nullable=False)
    end_point = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Integer)  # in minutes
    service_type = db.Column(db.String(20), nullable=False)  # ferry, bus, pickup
    active = db.Column(db.Boolean, default=True)
    fares = db.relationship('Fare', backref='route', lazy=True)
    schedules = db.relationship('Schedule', backref='route', lazy=True)

class Fare(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    route_id = db.Column(db.String(10), db.ForeignKey('route.id'), nullable=False)
    ticket_type = db.Column(db.String(20), nullable=False)  # passenger, car, motorcycle
    price = db.Column(db.Float, nullable=False)

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    route_id = db.Column(db.String(10), db.ForeignKey('route.id'), nullable=False)
    departure_time = db.Column(db.String(5), nullable=False)  # HH:MM format
    active = db.Column(db.Boolean, default=True)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    service_type = db.Column(db.String(20), nullable=False)  # ferry, bus, pickup
    route_id = db.Column(db.String(10), db.ForeignKey('route.id'), nullable=False)
    departure_date = db.Column(db.String(10), nullable=False)  # YYYY-MM-DD
    return_date = db.Column(db.String(10))
    passengers = db.Column(db.Integer, default=1)
    vehicles = db.Column(db.Integer, default=0)
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, cancelled
    payment_status = db.Column(db.String(20), default='unpaid')
    total_price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    
    route = db.relationship('Route')