import React, { useState } from 'react';
import { 
  ShieldCheck, Star, Bookmark, Share2, UserPlus, Play, Calendar, 
  Clock, MapPin, Eye, CheckCircle2, MessageSquare, Volume2, 
  VolumeX, Maximize2, Settings, Subtitles, ChevronRight, Check
} from 'lucide-react';
import { TIME_SLOTS } from '../data/doctorsData';

export default function DoctorProfilePage({ doctor, onBookDoctor, onBackToStream }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('Videos');
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState("4:30 PM");
  const [isPlayingLive, setIsPlayingLive] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  if (!doctor) return null;

  const stats = [
    { label: "YEARS EXP.", value: doctor.experience || "18+" },
    { label: "PATIENTS", value: doctor.patientsCount || "12.4K" },
    { label: "VIDEOS", value: doctor.videosCount || 142 },
    { label: "FOLLOWERS", value: doctor.followersCount || "38K" },
    { label: "WOULD RECOMMEND", value: doctor.recommendPercent || "94%" },
  ];

  const treatsList = doctor.treats || [
    "Hypertension", "Heart Failure", "Arrhythmia", "Cholesterol", 
    "Post-MI care", "Preventive Cardiology", "Pacemaker follow-up", "Echocardiography"
  ];

  const dates = [
    { day: "Today", date: "Thu 17", slots: "3 slots" },
    { day: "Tomorrow", date: "Fri 18", slots: "7 slots" },
    { day: "Sat", date: "May 19", slots: "5 slots" },
  ];

  const liveInfo = doctor.liveVideo || {
    title: "Hypertension at 30 – when to worry, what to actually do",
    watching: "2,814 watching",
    since: "7:00 PM",
    tags: ["HEART", "TELUGU - CC", "EDUCATIONAL - 13+"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-doctor-talking-to-a-patient-in-an-office-42866-large.mp4"
  };

  const shortsList = doctor.shorts || [
    { id: "s1", duration: "1:09", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80" },
    { id: "s2", duration: "0:32", image: "https://images.unsplash.com/photo-1594824813566-788534778b7c?auto=format&fit=crop&w=400&q=80" },
    { id: "s3", duration: "0:54", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80" },
    { id: "s4", duration: "1:02", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80" },
    { id: "s5", duration: "0:39", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="min-h-screen bg-[#0e131b] text-white pt-16 sm:pt-20 pb-16">
      
      {/* 1. TOP HEADER HERO BANNER */}
      <div className="relative bg-gradient-to-b from-[#16212e] via-[#101822] to-[#0e131b] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Breadcrumb / Back button */}
          <button 
            onClick={onBackToStream}
            className="text-xs text-netflix-cyan hover:underline font-bold mb-4 flex items-center gap-1"
          >
            ← Back to Home Stream
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left: Avatar & Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              
              {/* Doctor Avatar with Cyan Border Ring */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-netflix-cyan p-0.5 shadow-cyan-glow shrink-0 bg-black">
                <img 
                  src={doctor.image || doctor.posterImage} 
                  alt={doctor.doctorName} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Title & Metadata */}
              <div className="space-y-2">
                
                {/* Verified Badge & Rating */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className="bg-netflix-cyan/20 border border-netflix-cyan/50 text-netflix-cyan px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED DOCTOR
                  </span>
                  <span className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" /> {doctor.rating || 4.9} • {doctor.reviewsCount || "1,287"} reviews
                  </span>
                </div>

                {/* Doctor Name */}
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {doctor.doctorName}
                </h1>

                {/* Qualifications & Hospital */}
                <p className="text-sm font-semibold text-gray-300">
                  {doctor.specialty} - {doctor.degrees || "MBBS, MD (Cardiology), DM"}
                </p>

                {/* Tags Info */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-medium">
                  <span className="flex items-center gap-1 text-netflix-cyan">
                    <MapPin className="w-3.5 h-3.5" /> {doctor.hospital}
                  </span>
                  <span>•</span>
                  <span>{doctor.specialty}</span>
                  <span>•</span>
                  <span>{doctor.language || "Telugu - English"}</span>
                </div>

              </div>

            </div>

            {/* Right: Social Action Buttons */}
            <div className="flex items-center space-x-3 self-end md:self-center">
              
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isBookmarked ? 'bg-netflix-cyan text-black border-netflix-cyan' : 'bg-[#182332] text-gray-300 border-white/10 hover:border-gray-400'
                }`}
                title="Bookmark Profile"
              >
                <Bookmark className="w-5 h-5" />
              </button>

              <button 
                className="p-2.5 rounded-xl bg-[#182332] text-gray-300 border border-white/10 hover:border-gray-400 transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  isFollowing 
                    ? 'bg-gray-700 text-white border border-gray-600' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" /> Following ({doctor.followers || "58K"})
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 text-netflix-cyan" /> + Follow • {doctor.followers || "58K"}
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* MAIN CONTAINER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 2. STATS BAR (5 CARDS) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="bg-[#151f2b] border border-white/10 rounded-xl p-4 text-center hover:border-netflix-cyan/40 transition-colors"
            >
              <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* 3. TREATS / CONDITIONS PILLS */}
        <div className="space-y-2">
          <div className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">TREATS</div>
          <div className="flex flex-wrap gap-2">
            {treatsList.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-[#182637] border border-netflix-cyan/30 text-netflix-cyan text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-netflix-cyan/20 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 4. TABS NAVIGATION */}
        <div className="border-b border-white/10 flex items-center space-x-6 overflow-x-auto no-scrollbar text-sm font-bold">
          {["Videos 142", "About", "Reviews 1,287", "Clinic & hours", "Products"].map((tab) => {
            const isSelected = activeTab.startsWith(tab.split(" ")[0]);
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 relative transition-colors ${
                  isSelected ? 'text-netflix-cyan font-extrabold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-netflix-cyan rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* 5. TWO COLUMN BODY (LEFT: REELS & LIVE PLAYER, RIGHT: STICKY BOOKING WIDGET) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* BODY LEFT: SHORTS & LIVE VIDEO PLAYER (8 COLS) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Horizontal Shorts / Reels Row */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-gray-300 uppercase tracking-wider">INFORMATIVE SHORTS & REELS</span>
                <span className="text-netflix-cyan cursor-pointer hover:underline flex items-center gap-0.5">
                  See all 142 <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar py-1">
                {shortsList.map((short, idx) => (
                  <div 
                    key={short.id || idx}
                    className="shrink-0 w-28 sm:w-36 aspect-[9/16] relative rounded-xl overflow-hidden bg-black border border-white/10 group cursor-pointer hover:border-netflix-cyan transition-all"
                  >
                    <img 
                      src={short.image} 
                      alt="Short video" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Duration Badge */}
                    <div className="absolute top-2 right-2 bg-black/80 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white border border-white/20">
                      {short.duration}
                    </div>

                    {/* Play Icon */}
                    <div className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-netflix-cyan/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-black ml-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Live Video Player Card */}
            <div className="bg-[#121c27] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Video Area */}
              <div className="relative w-full aspect-video bg-black overflow-hidden group">
                {isPlayingLive ? (
                  <video
                    src={liveInfo.videoUrl}
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={doctor.image || doctor.posterImage}
                      alt={liveInfo.title}
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2 z-10">
                      <span className="bg-netflix-red text-white text-xs font-black px-2.5 py-1 rounded flex items-center gap-1 shadow-md animate-pulse">
                        ● LIVE
                      </span>
                      <span className="bg-black/70 backdrop-blur-md text-xs font-semibold text-white px-2.5 py-1 rounded border border-white/20 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-netflix-cyan" /> {liveInfo.watching}
                      </span>
                      <span className="bg-black/70 backdrop-blur-md text-xs font-semibold text-gray-300 px-2.5 py-1 rounded border border-white/20">
                        ⏰ {liveInfo.since}
                      </span>
                    </div>

                    {/* Play Overlay Button */}
                    <button
                      onClick={() => setIsPlayingLive(true)}
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-netflix-cyan text-black flex items-center justify-center shadow-cyan-glow group-hover:scale-110 transition-transform"
                    >
                      <Play className="w-8 h-8 fill-black ml-1" />
                    </button>

                    {/* Bottom Video Bar Controls Mock */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10 text-xs text-white">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-red-500 font-bold">LIVE - 42:18</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <span className="bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-mono border border-white/20">Auto • 1080p</span>
                        <Subtitles className="w-4 h-4 cursor-pointer hover:text-white" />
                        <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Video Info Footer */}
              <div className="p-5 space-y-3">
                {/* Category Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {liveInfo.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="bg-netflix-cyan/10 text-netflix-cyan text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-netflix-cyan/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Video Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {liveInfo.title}
                </h3>
              </div>

            </div>

          </div>

          {/* BODY RIGHT: STICKY BOOK APPOINTMENT WIDGET (4 COLS) */}
          <div className="lg:col-span-4 sticky top-24">
            
            <div className="bg-[#14202d] border border-netflix-cyan/40 rounded-2xl p-5 sm:p-6 shadow-cyan-glow space-y-6">
              
              {/* Fee Header */}
              <div className="border-b border-white/10 pb-4 space-y-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">CONSULTATION FEE</div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-white">₹{doctor.fee || 800}</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">
                  In-clinic • 30 min • Free callback for new patients
                </p>
              </div>

              {/* Next Available Date Selector */}
              <div className="space-y-2">
                <div className="text-xs font-extrabold text-gray-300 uppercase tracking-wider">NEXT AVAILABLE</div>
                <div className="grid grid-cols-3 gap-2">
                  {dates.map((item, idx) => {
                    const isSelected = selectedDateIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDateIndex(idx)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isSelected 
                            ? 'bg-netflix-cyan text-black font-extrabold border-netflix-cyan shadow-md' 
                            : 'bg-[#1a2736] text-gray-300 border-white/10 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-xs font-extrabold">{item.day}</div>
                        <div className="text-[10px] opacity-90">{item.date}</div>
                        <div className="text-[9px] font-mono mt-0.5 font-bold text-netflix-teal">{item.slots}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Selector */}
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {["4:30 PM", "5:00 PM", "6:00 PM"].map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-colors ${
                          isSelected ? 'bg-white text-black border-white' : 'bg-[#1a2736] text-gray-300 border-white/10 hover:border-gray-400'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onBookDoctor({
                    ...doctor,
                    selectedDate: `${dates[selectedDateIndex].day} (${dates[selectedDateIndex].date})`,
                    selectedSlot
                  })}
                  className="w-full bg-netflix-cyan hover:bg-netflix-teal text-black font-extrabold py-3.5 rounded-xl text-sm shadow-cyan-glow transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 fill-black" />
                  <span>Book for {dates[selectedDateIndex].day}, {selectedSlot}</span>
                </button>

                <button
                  onClick={() => onBookDoctor(doctor)}
                  className="w-full bg-[#1c2b3c] hover:bg-[#23354a] text-white font-bold py-3 rounded-xl text-xs border border-white/10 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-netflix-cyan" />
                  <span>Send an enquiry first</span>
                </button>
              </div>

              {/* Guarantees List */}
              <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Free cancellation up to 2 hours before</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Wheelchair accessible - Parking available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Accepts Apollo cashless - Insurance OK</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
