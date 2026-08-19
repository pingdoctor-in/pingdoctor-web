import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import PosterRow from './components/PosterRow';
import DoctorDetailModal from './components/DoctorDetailModal';
import MyAppointmentsModal from './components/MyAppointmentsModal';
import Footer from './components/Footer';
import { 
  FEATURED_CONTENT, 
  HEALTH_SHORTS, 
  DEEP_DIVES, 
  DEPARTMENTS 
} from './data/doctorsData';
import { Stethoscope, Heart, Activity, Sparkles, Filter, CheckCircle, Search } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  
  // Modal states
  const [activeDoctorModal, setActiveDoctorModal] = useState(null);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);

  // Booked appointments list
  const [bookedAppointments, setBookedAppointments] = useState([
    {
      bookingId: 'PING-849201',
      doctorName: 'Dr. Kaushik Reddy',
      specialty: 'Cardiologist',
      hospital: 'Hyderguda Cardiology Care',
      consultType: 'Online Video Consultation',
      date: 'Today (Aug 19)',
      timeSlot: '05:00 PM',
      patientName: 'John Doe',
      patientPhone: '+91 98765 43210',
      fee: 700,
    }
  ]);

  // Filter function helper
  const filterItem = (item) => {
    const matchesSearch = 
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = 
      selectedDepartment === 'All Departments' ||
      item.specialty.toLowerCase().includes(selectedDepartment.toLowerCase().replace(' & diet', '').replace('all departments', ''));

    return matchesSearch && matchesDept;
  };

  // Filtered rows
  const filteredShorts = useMemo(() => HEALTH_SHORTS.filter(filterItem), [searchQuery, selectedDepartment]);
  const filteredDeepDives = useMemo(() => DEEP_DIVES.filter(filterItem), [searchQuery, selectedDepartment]);

  const handleConfirmBooking = (bookingData) => {
    setBookedAppointments((prev) => [bookingData, ...prev]);
  };

  const handleCancelAppointment = (bookingId) => {
    setBookedAppointments((prev) => prev.filter((item) => item.bookingId !== bookingId));
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col selection:bg-netflix-cyan selection:text-black">
      
      {/* Sticky Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        departments={DEPARTMENTS}
        bookedCount={bookedAppointments.length}
        onOpenAppointments={() => setIsAppointmentsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* Featured Hero Banner */}
        <HeroBanner
          featured={FEATURED_CONTENT}
          onSelectDoctor={(doc) => setActiveDoctorModal(doc)}
          onBookDoctor={(doc) => setActiveDoctorModal(doc)}
        />

        {/* Department Filter Chips Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-2 border-b border-white/10">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-2">
              <Filter className="w-3.5 h-3.5 text-netflix-cyan" /> Filter:
            </span>
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                    isSelected
                      ? 'bg-netflix-cyan text-black shadow-cyan-glow'
                      : 'bg-[#222222] text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Results Alert if active */}
        {searchQuery && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="bg-netflix-card border border-netflix-cyan/40 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-netflix-cyan" />
                <span className="text-sm font-semibold">
                  Showing results for "<strong className="text-white">{searchQuery}</strong>"
                </span>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-netflix-cyan hover:underline font-bold"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* ROW 1: 70% HEALTH SHORTS (9:16 Vertical Reels/Posters) matching design */}
        <PosterRow
          title="70% HEALTH SHORTS"
          badgeText="9:16 VERTICAL REELS"
          items={filteredShorts}
          aspectRatio="9/16"
          onSelectDoctor={(doc) => setActiveDoctorModal(doc)}
          onBookDoctor={(doc) => setActiveDoctorModal(doc)}
        />

        {/* ROW 2: 30% DEEP DIVES & PODCASTS (16:9 Landscape Video Cards) matching design */}
        <PosterRow
          title="30% DEEP DIVES & PODCASTS"
          badgeText="16:9 MASTERCLASSES"
          items={filteredDeepDives}
          aspectRatio="16/9"
          onSelectDoctor={(doc) => setActiveDoctorModal(doc)}
          onBookDoctor={(doc) => setActiveDoctorModal(doc)}
        />

        {/* ROW 3: TOP CARDIOLOGY SPECIALISTS */}
        <PosterRow
          title="CARDIOLOGY & HEART CARE"
          badgeText="TOP SPECIALISTS"
          items={HEALTH_SHORTS.filter((d) => d.specialty.includes('Cardiology') || d.specialty.includes('Ortho'))}
          aspectRatio="9/16"
          onSelectDoctor={(doc) => setActiveDoctorModal(doc)}
          onBookDoctor={(doc) => setActiveDoctorModal(doc)}
        />

        {/* ROW 4: WELLNESS & DIET PODCASTS */}
        <PosterRow
          title="NUTRITION & METABOLIC HEALTH"
          badgeText="16:9 EPISODES"
          items={DEEP_DIVES.filter((d) => d.specialty.includes('Endocrinology') || d.specialty.includes('Dermatology') || d.specialty.includes('Psychiatry'))}
          aspectRatio="16/9"
          onSelectDoctor={(doc) => setActiveDoctorModal(doc)}
          onBookDoctor={(doc) => setActiveDoctorModal(doc)}
        />

      </main>

      {/* Footer Component */}
      <Footer />

      {/* Doctor Detail & Booking Modal */}
      {activeDoctorModal && (
        <DoctorDetailModal
          doctor={activeDoctorModal}
          onClose={() => setActiveDoctorModal(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

      {/* My Appointments Drawer Modal */}
      {isAppointmentsOpen && (
        <MyAppointmentsModal
          appointments={bookedAppointments}
          onClose={() => setIsAppointmentsOpen(false)}
          onCancelAppointment={handleCancelAppointment}
        />
      )}

    </div>
  );
}
