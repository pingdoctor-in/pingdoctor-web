import React, { useState } from 'react';
import { Play, Plus, Check, Calendar, Star, Volume2, VolumeX, ShieldCheck, MapPin } from 'lucide-react';

export default function HeroBanner({ featured, onSelectDoctor, onBookDoctor }) {
  const [isMuted, setIsMuted] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] min-h-[500px] max-h-[800px] overflow-hidden bg-black">
      
      {/* Background Image / Video Backdrop */}
      <div className="absolute inset-0 z-0">
        {isPlayingVideo ? (
          <video
            src={featured.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-full object-cover scale-105"
          />
        ) : (
          <img
            src={featured.posterImage}
            alt={featured.title}
            className="w-full h-full object-cover object-top filter brightness-90 scale-105"
          />
        )}

        {/* Netflix Dark Vignette Gradient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent w-full lg:w-3/4 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/60 z-10" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto h-full flex flex-col justify-end pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 sm:space-y-4">
          
          {/* Top Tag Badges */}
          <div className="flex items-center space-x-2 text-xs font-bold">
            <span className="bg-netflix-red text-white px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-md">
              FEATURED
            </span>
            <span className="bg-black/60 backdrop-blur-md text-netflix-cyan border border-netflix-cyan/40 px-2.5 py-1 rounded-sm flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Specialist
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg leading-none uppercase">
            {featured.title}
          </h1>

          {/* Subtitle / Doctor Info */}
          <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-200 font-semibold">
            <span className="text-netflix-cyan font-bold">{featured.doctorName}</span>
            <span>•</span>
            <span>{featured.specialty}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4 fill-yellow-400" /> {featured.rating} ({featured.reviewsCount} reviews)
            </span>
          </div>

          {/* Hospital Location */}
          <div className="flex items-center space-x-1.5 text-xs sm:text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-netflix-cyan shrink-0" />
            <span>{featured.hospital}</span>
          </div>

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl">
            {featured.description}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            
            {/* Play Tip Button */}
            <button
              onClick={() => setIsPlayingVideo(!isPlayingVideo)}
              className="flex items-center space-x-2 bg-white text-black hover:bg-gray-200 font-bold px-6 py-2.5 rounded-md transition-all hover:scale-105 text-sm sm:text-base shadow-lg"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>{isPlayingVideo ? 'Pause Tip' : 'PLAY TIP'}</span>
            </button>

            {/* Add to Watchlist */}
            <button
              onClick={() => setInWatchlist(!inWatchlist)}
              className="flex items-center space-x-2 bg-gray-600/70 hover:bg-gray-500/80 text-white font-semibold px-4 py-2.5 rounded-md backdrop-blur-md transition-all text-sm"
            >
              {inWatchlist ? <Check className="w-5 h-5 text-green-400" /> : <Plus className="w-5 h-5" />}
              <span className="hidden sm:inline">{inWatchlist ? 'IN WATCHLIST' : 'ADD TO WATCHLIST'}</span>
            </button>

            {/* Book Doctor Action */}
            <button
              onClick={() => onBookDoctor(featured)}
              className="flex items-center space-x-2 bg-netflix-cyan hover:bg-netflix-teal text-black font-extrabold px-6 py-2.5 rounded-md transition-all hover:scale-105 text-sm sm:text-base shadow-cyan-glow"
            >
              <Calendar className="w-5 h-5" />
              <span>BOOK A DOCTOR</span>
            </button>

            {/* Audio Toggle if video active */}
            {isPlayingVideo && (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-colors ml-auto"
                aria-label="Toggle Sound"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
