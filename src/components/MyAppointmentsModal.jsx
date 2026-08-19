import React from 'react';
import { X, Calendar, Clock, Video, MapPin, Trash2, CheckCircle, ShieldCheck } from 'lucide-react';

export default function MyAppointmentsModal({ appointments, onClose, onCancelAppointment }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-[#181818] border border-white/20 rounded-2xl p-6 text-white shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-netflix-cyan" />
            <h2 className="text-xl font-extrabold">My Booked Appointments</h2>
            <span className="bg-netflix-cyan/20 text-netflix-cyan text-xs font-bold px-2.5 py-0.5 rounded-full">
              {appointments.length} Active
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 text-gray-300 hover:text-white hover:bg-netflix-red transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        {appointments.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-500">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-300">No Appointments Booked Yet</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Browse top doctors on the homepage and click "Book" on any poster to schedule an online video consultation or clinic visit.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {appointments.map((appt) => (
              <div 
                key={appt.bookingId} 
                className="bg-[#222222] border border-white/10 hover:border-netflix-cyan/50 rounded-xl p-4 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-netflix-cyan bg-black/60 px-2 py-0.5 rounded border border-white/10">
                      {appt.bookingId}
                    </span>
                    <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                    </span>
                  </div>

                  <h4 className="text-base font-extrabold text-white">{appt.doctorName}</h4>
                  <p className="text-xs text-gray-300">{appt.specialty} • {appt.hospital}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-white">
                      <Calendar className="w-3.5 h-3.5 text-netflix-cyan" /> {appt.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-white">
                      <Clock className="w-3.5 h-3.5 text-yellow-400" /> {appt.timeSlot}
                    </span>
                    <span>•</span>
                    <span className="text-netflix-cyan font-semibold">{appt.consultType}</span>
                  </div>
                </div>

                {/* Cancel Action */}
                <button
                  onClick={() => onCancelAppointment(appt.bookingId)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold px-3 py-2 rounded-lg border border-red-500/30 transition-colors flex items-center gap-1 shrink-0 self-end sm:self-center"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Cancel Slot
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="bg-netflix-cyan hover:bg-netflix-teal text-black font-bold px-6 py-2 rounded-xl text-xs"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
}
