import React from 'react';
import { Stethoscope, ShieldCheck, Heart, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 text-xs py-10 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Branding & Emergency Callout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="PingDoctor Logo"
              className="h-10 w-auto object-contain rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-2 bg-[#1f1f1f] px-4 py-2 rounded-full border border-white/10 text-xs">
            <PhoneCall className="w-4 h-4 text-netflix-cyan" />
            <span>24/7 Medical Helpline: <strong className="text-white">1800-419-PING</strong></span>
          </div>
        </div>

        {/* Links Navigation matching screenshot */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-gray-400">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            <a href="#disclaimer" className="hover:text-white transition-colors">Disclaimer</a>
            <a href="#advisors" className="hover:text-white transition-colors">Medical Advisors</a>
            <a href="#clinics" className="hover:text-white transition-colors">Local Clinics</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>

          <div className="text-gray-500 text-[11px]">
            © 2026 PINGDOCTOR HEALTH INC. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="text-[11px] text-gray-500 leading-relaxed max-w-4xl">
          Disclaimer: PingDoctor provides online doctor consultations, health awareness video tips, and medical appointment scheduling. For life-threatening medical emergencies, please visit the nearest hospital or dial local emergency services immediately.
        </p>

      </div>
    </footer>
  );
}
