// src/components/admin/BookingsList.jsx
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const BookingsList = ({ bookings }) => {
  return (
    <div className="space-y-4">
      {bookings.map(booking => (
        <div key={booking.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">{booking.title}</h3>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="flex justify-center mt-4 mb-4">
            <img 
              src={booking.image} 
              alt="Booking" 
              className="rounded-lg max-h-40 object-cover" 
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsList;