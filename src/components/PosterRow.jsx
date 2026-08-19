import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Calendar, Star, Languages, Clock } from 'lucide-react';

export default function PosterRow({ 
  title, 
  badgeText, 
  items, 
  aspectRatio = "9/16", 
  onSelectDoctor, 
  onBookDoctor 
}) {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const isVertical = aspectRatio === "9/16";

  return (
    <div className="relative my-6 sm:my-8 px-4 sm:px-6 lg:px-8 group/row">
      
      {/* Row Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight uppercase flex items-center gap-2">
            <span>{title}</span>
          </h2>
          {badgeText && (
            <span className="text-[11px] font-bold text-netflix-cyan bg-netflix-cyan/10 border border-netflix-cyan/30 px-2 py-0.5 rounded uppercase">
              {badgeText}
            </span>
          )}
        </div>

        {/* Scroll Controls */}
        <div className="hidden sm:flex items-center space-x-2">
          <button
            onClick={() => handleScroll('left')}
            className="p-1.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-netflix-cyan hover:text-black transition-colors"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-1.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-netflix-cyan hover:text-black transition-colors"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Posters Horizontal Scroll Track */}
      <div
        ref={rowRef}
        className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-3"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`shrink-0 relative group/card cursor-pointer rounded-xl overflow-hidden bg-netflix-card border border-white/10 hover:border-netflix-cyan transition-all duration-300 ${
              isVertical ? 'w-40 sm:w-52 md:w-60 aspect-[9/16]' : 'w-64 sm:w-80 md:w-96 aspect-[16/9]'
            }`}
          >
            {/* Poster Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
            />

            {/* Top Badges */}
            <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
              <span className="bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-semibold text-gray-200 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                <Languages className="w-3 h-3 text-netflix-cyan" />
                {item.language}
              </span>

              {item.duration && (
                <span className="bg-black/80 backdrop-blur-md text-[10px] font-bold text-white px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3 text-yellow-400" />
                  {item.duration}
                </span>
              )}
            </div>

            {/* Dark Vignette Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover/card:opacity-95 transition-opacity" />

            {/* Card Content Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 flex flex-col justify-end space-y-1">
              
              {/* Specialization Badge */}
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-netflix-cyan line-clamp-1">
                {item.specialty}
              </div>

              {/* Poster Title */}
              <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug line-clamp-2 uppercase">
                {item.title}
              </h3>

              {/* Doctor Name & Rating */}
              <div className="flex items-center justify-between text-xs text-gray-300 pt-0.5">
                <span className="font-semibold truncate max-w-[70%]">{item.doctorName}</span>
                <span className="flex items-center gap-0.5 text-yellow-400 font-bold text-[11px]">
                  <Star className="w-3 h-3 fill-yellow-400" />
                  {item.rating}
                </span>
              </div>

              {/* Hover Actions: Play & Book */}
              <div className="pt-2 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover/card:opacity-100 transition-opacity duration-300">
                
                {/* Watch / Detail button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDoctor(item);
                  }}
                  className="flex-1 bg-white hover:bg-gray-200 text-black text-xs font-bold py-1.5 px-2 rounded flex items-center justify-center gap-1 shadow-md transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>WATCH</span>
                </button>

                {/* Quick Book Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookDoctor(item);
                  }}
                  className="flex-1 bg-netflix-cyan hover:bg-netflix-teal text-black text-xs font-extrabold py-1.5 px-2 rounded flex items-center justify-center gap-1 shadow-cyan-glow transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK</span>
                </button>

              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
