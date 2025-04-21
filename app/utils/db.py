from app.models import db, Route, Fare, Schedule

def init_db():
    if Route.query.first() is None:
        # Insert ferry routes
        ferry_routes = [
            Route(id='R0001', name='ดอนสัก - เกาะสมุย (ท่าเรือลิปะน้อย)', 
                 start_point='Don Sak', end_point='Koh Samui (Lipanoi Pier)', 
                 duration=90, service_type='ferry'),
            # Add other routes similarly...
        ]
        
        # Insert bus routes
        bus_routes = [
            Route(id='R0005', name='สนามบินสุราษฎร์ธานี - เกาะสมุย (ท่าเรือลิปะน้อย)', 
                 start_point='Surat Thani Airport', end_point='Koh Samui (Lipanoi Pier)', 
                 duration=210, service_type='bus'),
            # Add other routes similarly...
        ]
        
        db.session.add_all(ferry_routes + bus_routes)
        
        # Insert fares
        fares = [
            Fare(route_id='R0001', ticket_type='passenger', price=170.00),
            Fare(route_id='R0001', ticket_type='car', price=800.00),
            # Add other fares similarly...
        ]
        
        db.session.add_all(fares)
        
        # Insert schedules
        schedules = [
            Schedule(route_id='R0001', departure_time='05:00'),
            Schedule(route_id='R0001', departure_time='09:00'),
            # Add other schedules similarly...
        ]
        
        db.session.add_all(schedules)
        db.session.commit()