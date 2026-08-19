import React, { useState } from 'react';
import { X, Play, Calendar, Clock, MapPin, Star, ShieldCheck, Video, User, Phone, CheckCircle2, Award, Sparkles, QrCode } from 'lucide-react';
import { TIME_SLOTS } from '../data/doctorsData';

export default function DoctorDetailModal({ doctor, onClose, onConfirmBooking }) {
  const [activeTab, setActiveTab] = useState('PROFILE'); // 'PROFILE', 'BOOKING', 'CONFIRMED'
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Booking Form State
  const [consultType, setConsultType] = useState('VIDEO'); // 'VIDEO' or 'IN_PERSON'
  const [selectedDate, setSelectedDate] = useState('Today (Aug 19)');
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  if (!doctor) return null;

  const dates = [
    { label: 'Today', date: 'Aug 19' },
    { label: 'Tomorrow', date: 'Aug 20' },
    { label: 'Thu', date: 'Aug 21' },
    { label: 'Fri', date: 'Aug 22' },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please enter patient name and phone number.');
      return;
    }

    const bookingData = {
      bookingId: 'PING-' + Math.floor(100000 + Math.random() * 900000),
      doctorName: doctor.doctorName,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      consultType: consultType === 'VIDEO' ? 'Online Video Consultation' : 'In-Person Clinic Visit',
      date: selectedDate,
      timeSlot: selectedSlot,
      patientName,
      patientPhone,
      fee: doctor.fee || 600,
      bookedAt: new Date().toLocaleTimeString(),
    };

    setBookingResult(bookingData);
    onConfirmBooking(bookingData);
    setActiveTab('CONFIRMED');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#181818] border border-white/20 rounded-2xl overflow-hidden shadow-2xl my-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-white hover:bg-netflix-red transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video / Banner Header Header */}
        <div className="relative w-full h-56 sm:h-72 bg-black overflow-hidden">
          {isPlayingVideo ? (
            <video
              src={doctor.videoUrl}
              autoPlay
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <img
                src={doctor.image || doctor.posterImage}
                alt={doctor.doctorName}
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/40" />

              {/* Play Video Tip Button Overlay */}
              {doctor.videoUrl && (
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-netflix-cyan text-black flex items-center justify-center shadow-cyan-glow hover:scale-110 transition-transform"
                >
                  <Play className="w-8 h-8 fill-black ml-1" />
                </button>
              )}
            </>
          )}

          {/* Specialization Tag */}
          <div className="absolute bottom-4 left-6 z-20 flex items-center space-x-2">
            <span className="bg-netflix-red text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
              {doctor.specialty}
            </span>
            <span className="bg-black/70 backdrop-blur-md text-netflix-cyan text-xs font-semibold px-3 py-1 rounded-sm border border-netflix-cyan/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Doctor
            </span>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#1f1f1f] px-6">
          <button
            onClick={() => setActiveTab('PROFILE')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-colors ${
              activeTab === 'PROFILE' ? 'border-netflix-cyan text-netflix-cyan' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Doctor Profile & Video Tip
          </button>
          <button
            onClick={() => setActiveTab('BOOKING')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'BOOKING' || activeTab === 'CONFIRMED' ? 'border-netflix-cyan text-netflix-cyan' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Book Online Appointment
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          
          {/* TAB 1: DOCTOR PROFILE */}
          {activeTab === 'PROFILE' && (
            <div className="space-y-6">
              
              {/* Doctor Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{doctor.doctorName}</h2>
                  <p className="text-sm text-gray-300 font-medium">{doctor.specialty} • {doctor.experience || '10+ Years Exp'}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-netflix-cyan" /> {doctor.hospital}
                  </p>
                </div>

                <div className="bg-[#242424] p-3 rounded-xl border border-white/10 flex items-center gap-4">
                  <div>
                    <div className="text-xs text-gray-400">Consultation Fee</div>
                    <div className="text-xl font-extrabold text-netflix-cyan">₹{doctor.fee || 600}</div>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <div className="text-xs text-gray-400">Rating</div>
                    <div className="text-sm font-bold text-yellow-400 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400" /> {doctor.rating || 4.9}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Medical Focus */}
              <div className="bg-[#222222] p-4 rounded-xl border border-white/10 space-y-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">About Doctor & Clinical Focus</h3>
                <p className="text-sm text-gray-200 leading-relaxed">
                  {doctor.bio || `${doctor.doctorName} is a senior ${doctor.specialty} providing expert diagnosis, video consultations, and patient care.`}
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-netflix-cyan" />
                  <span>Available for Instant Video Call & Clinic Visits</span>
                </div>

                <button
                  onClick={() => setActiveTab('BOOKING')}
                  className="w-full sm:w-auto bg-netflix-cyan hover:bg-netflix-teal text-black font-extrabold px-8 py-3 rounded-xl shadow-cyan-glow transition-all hover:scale-105 flex items-center justify-center gap-2 text-base"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment Now</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: BOOKING FORM */}
          {activeTab === 'BOOKING' && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Doctor Quick Bar */}
              <div className="flex items-center space-x-3 bg-[#222222] p-3 rounded-xl border border-white/10">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <img src={doctor.image || doctor.posterImage} alt={doctor.doctorName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{doctor.doctorName}</h4>
                  <p className="text-xs text-netflix-cyan font-medium">{doctor.specialty} • ₹{doctor.fee || 600}</p>
                </div>
              </div>

              {/* Step 1: Select Consultation Type */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-gray-300 uppercase tracking-wider">1. Select Consultation Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultType('VIDEO')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all ${
                      consultType === 'VIDEO' ? 'bg-netflix-cyan/20 border-netflix-cyan text-netflix-cyan' : 'bg-[#222222] border-white/10 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <Video className="w-4 h-4" /> Online Video Call
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultType('IN_PERSON')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all ${
                      consultType === 'IN_PERSON' ? 'bg-netflix-cyan/20 border-netflix-cyan text-netflix-cyan' : 'bg-[#222222] border-white/10 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <MapPin className="w-4 h-4" /> In-Person Clinic Visit
                  </button>
                </div>
              </div>

              {/* Step 2: Date Selector */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-gray-300 uppercase tracking-wider">2. Select Consultation Date</label>
                <div className="grid grid-cols-4 gap-2">
                  {dates.map((item) => {
                    const fullLabel = `${item.label} (${item.date})`;
                    const isSelected = selectedDate === fullLabel;
                    return (
                      <button
                        key={item.date}
                        type="button"
                        onClick={() => setSelectedDate(fullLabel)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected ? 'bg-netflix-cyan text-black font-bold border-netflix-cyan' : 'bg-[#222222] text-gray-300 border-white/10 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-[11px] uppercase font-bold">{item.label}</div>
                        <div className="text-xs font-extrabold">{item.date}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Time Slot Selector */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-gray-300 uppercase tracking-wider">3. Select Time Slot</label>
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                          isSelected ? 'bg-white text-black border-white' : 'bg-[#222222] text-gray-300 border-white/10 hover:border-gray-500'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Patient Information */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-extrabold text-gray-300 uppercase tracking-wider">4. Patient Details</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Patient Full Name *"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                      className="w-full bg-[#222222] border border-white/20 rounded-xl py-2.5 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-netflix-cyan"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      required
                      className="w-full bg-[#222222] border border-white/20 rounded-xl py-2.5 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-netflix-cyan"
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Reason for visit or symptoms (optional)..."
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  rows="2"
                  className="w-full bg-[#222222] border border-white/20 rounded-xl p-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-netflix-cyan"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-netflix-cyan hover:bg-netflix-teal text-black font-extrabold py-3.5 rounded-xl text-base shadow-cyan-glow transition-all hover:scale-[1.01]"
                >
                  Confirm & Lock Appointment (₹{doctor.fee || 600})
                </button>
              </div>

            </form>
          )}

          {/* TAB 3: BOOKING CONFIRMED RECEIPT */}
          {activeTab === 'CONFIRMED' && bookingResult && (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 border border-green-500/40 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white">Appointment Confirmed!</h3>
                <p className="text-sm text-gray-300 mt-1">Your slot is locked with {bookingResult.doctorName}.</p>
              </div>

              {/* Digital Pass Ticket */}
              <div className="max-w-md mx-auto bg-gradient-to-br from-[#242424] to-[#1a1a1a] border border-netflix-cyan/40 rounded-2xl p-5 shadow-cyan-glow text-left space-y-4 relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-netflix-cyan tracking-wider">BOOKING PASS</div>
                    <div className="text-lg font-bold text-white">{bookingResult.doctorName}</div>
                    <div className="text-xs text-gray-400">{bookingResult.specialty}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-white bg-black/60 px-2 py-1 rounded border border-white/20">
                      {bookingResult.bookingId}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400 block">Date & Time</span>
                    <span className="font-bold text-white">{bookingResult.date} at {bookingResult.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Consult Type</span>
                    <span className="font-bold text-netflix-cyan">{bookingResult.consultType}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Patient Name</span>
                    <span className="font-bold text-white">{bookingResult.patientName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">Contact Phone</span>
                    <span className="font-bold text-white">{bookingResult.patientPhone}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <QrCode className="w-5 h-5 text-netflix-cyan" /> Scan at counter / video link
                  </div>
                  <span className="font-extrabold text-green-400">STATUS: CONFIRMED</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="bg-white hover:bg-gray-200 text-black font-bold px-6 py-2.5 rounded-xl text-sm"
                >
                  Done & Back to Stream
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
