from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from app.models import Booking, Route, Fare
from app import db
from datetime import datetime

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/', methods=['GET', 'POST'])
def book():
    if request.method == 'POST':
        service_type = request.form.get('service')
        route_id = request.form.get('route')
        departure_date = request.form.get('date_start')
        return_date = request.form.get('date_end') or None
        passengers = int(request.form.get('outward_people_num', 1))
        vehicles = int(request.form.get('outward_car_num', 0))
        ticket_type = request.form.get('type', 'passenger')
        
        # Get fare
        fare = Fare.query.filter_by(route_id=route_id, ticket_type=ticket_type).first()
        if not fare:
            flash('Invalid fare selection', 'danger')
            return redirect(url_for('booking.book'))
        
        # Calculate price
        if ticket_type == 'passenger':
            total_price = fare.price * passengers
        else:
            total_price = fare.price * vehicles
        
        if return_date:
            total_price *= 2  # Round trip
            
        # Store booking in session before payment
        session['pending_booking'] = {
            'service_type': service_type,
            'route_id': route_id,
            'departure_date': departure_date,
            'return_date': return_date,
            'passengers': passengers,
            'vehicles': vehicles,
            'ticket_type': ticket_type,
            'total_price': total_price
        }
        
        return redirect(url_for('booking.payment'))
    
    ferry_routes = Route.query.filter_by(service_type='ferry').all()
    bus_routes = Route.query.filter_by(service_type='bus').all()
    return render_template('booking/book.html', ferry_routes=ferry_routes, bus_routes=bus_routes)

@booking_bp.route('/payment', methods=['GET', 'POST'])
def payment():
    if 'pending_booking' not in session:
        flash('No booking to pay for', 'warning')
        return redirect(url_for('booking.book'))
    
    booking_data = session['pending_booking']
    
    if request.method == 'POST':
        # Process payment (in real app, integrate with payment gateway)
        payment_method = request.form.get('payment_method')
        
        # Create booking record
        booking = Booking(
            user_id=session.get('user_id'),
            service_type=booking_data['service_type'],
            route_id=booking_data['route_id'],
            departure_date=booking_data['departure_date'],
            return_date=booking_data['return_date'],
            passengers=booking_data['passengers'],
            vehicles=booking_data['vehicles'],
            status='confirmed',
            payment_status='paid',
            total_price=booking_data['total_price']
        )
        
        db.session.add(booking)
        db.session.commit()
        
        # Clear pending booking
        session.pop('pending_booking', None)
        
        flash('Booking confirmed!', 'success')
        return redirect(url_for('booking.confirmation', booking_id=booking.id))
    
    return render_template('booking/payment.html', booking=booking_data)

@booking_bp.route('/confirmation/<int:booking_id>')
def confirmation(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    return render_template('booking/confirmation.html', booking=booking)

@booking_bp.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash('Please login to view your dashboard', 'warning')
        return redirect(url_for('auth.login'))
    
    bookings = Booking.query.filter_by(user_id=session['user_id']).order_by(Booking.created_at.desc()).all()
    return render_template('booking/dashboard.html', bookings=bookings)