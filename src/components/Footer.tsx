import React from "react";
import { Link } from "react-router-dom";
import { Music, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px] shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                <div className="flex h-full w-full items-center justify-center rounded-[7px] bg-black">
                  <Music className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase">
                Rave<span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Nation</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The ultimate electronic music event discovery platform for Poland. Connecting ravers with the best underground techno, house, psytrance, and bass music events.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="hover:text-purple-400 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="https://twitter.com" className="hover:text-cyan-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="https://youtube.com" className="hover:text-pink-400 transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/events" className="hover:text-white transition-colors">All Events</Link></li>
              <li><Link to="/venues" className="hover:text-white transition-colors">Venues Directory</Link></li>
              <li><Link to="/artists" className="hover:text-white transition-colors">Artist Database</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">News & Editorial</Link></li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal & Info</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advertising & Partnerships</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3 text-sm">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h3>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-purple-400" />
              <span>support@ravenation.pl</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-cyan-400" />
              <span>+48 22 123 45 67</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-pink-400" />
              <span>Warsaw, Poland</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-lg w-fit">
              <ShieldCheck className="h-4 w-4 mr-1" />
              <span>Verified Secure Platform</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs">
          <p>&copy; {new Date().getFullYear()} Rave Nation Poland. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-500">Made with passion for the underground</span>
          </div>
        </div>
      </div>
    </footer>
  );
};