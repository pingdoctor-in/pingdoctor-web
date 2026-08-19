import React, { useState, useEffect } from 'react';
import { Search, Bell, Calendar, Menu, X, Stethoscope, Video, ChevronDown } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  selectedDepartment, 
  setSelectedDepartment,
  departments,
  bookedCount,
  onOpenAppointments 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-[#141414]/95 backdrop-blur-md border-b border-white/10 shadow-2xl' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Main Nav */}
          <div className="flex items-center space-x-6 lg:space-x-10">
            {/* Logo */}
            <div 
              onClick={() => setActiveTab('HOME')} 
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-netflix-cyan to-netflix-teal flex items-center justify-center shadow-cyan-glow group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1">
                  Ping<span className="text-netflix-cyan">Doctor</span>
                </span>
                <span className="text-[10px] tracking-wider text-gray-400 -mt-1 font-semibold uppercase">
                  Netflix for Health
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
              {['HOME', 'DEPARTMENTS', 'WELLNESS', 'MY HEALTH'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`transition-colors relative py-1 ${
                    activeTab === tab 
                      ? 'text-white font-bold' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-netflix-cyan rounded-full animate-fade-in" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Action Icons: Search, Dept Filter, My Appointments & User Avatar */}
          <div className="flex items-center space-x-3 sm:space-x-4">

            {/* Department Quick Selector */}
            <div className="hidden lg:block relative">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-black/60 border border-white/20 text-gray-200 text-xs rounded-full py-1.5 px-3 pr-8 focus:outline-none focus:border-netflix-cyan cursor-pointer appearance-none"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-[#1f1f1f] text-white">
                    {dept}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="relative">
              <div className={`flex items-center transition-all duration-300 ${
                isSearchOpen ? 'w-48 sm:w-64 bg-black/80 border border-white/30 rounded-full px-3 py-1.5' : 'w-9 h-9 justify-center'
              }`}>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                </button>
                {isSearchOpen && (
                  <input
                    type="text"
                    placeholder="Search doctor, symptom, tip..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder-gray-400 ml-2 focus:outline-none"
                    autoFocus
                  />
                )}
              </div>
            </div>

            {/* My Booked Appointments Button */}
            <button
              onClick={onOpenAppointments}
              className="relative flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold py-1.5 px-3 rounded-full border border-white/20 transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-netflix-cyan" />
              <span className="hidden sm:inline">My Appointments</span>
              {bookedCount > 0 && (
                <span className="ml-1 bg-netflix-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {bookedCount}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/30 cursor-pointer hover:border-netflix-cyan transition-colors">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="User Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181818] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-semibold">
            {['HOME', 'DEPARTMENTS', 'WELLNESS', 'MY HEALTH'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-3 rounded-lg ${
                  activeTab === tab ? 'bg-netflix-cyan/20 text-netflix-cyan font-bold' : 'text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <label className="text-xs text-gray-400 block mb-1">Select Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-black/60 border border-white/20 text-gray-200 text-xs rounded-lg py-2 px-3 focus:outline-none"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept} className="bg-[#1f1f1f] text-white">
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
