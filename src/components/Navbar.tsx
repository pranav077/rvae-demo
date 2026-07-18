import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Globe, User, LogOut, Calendar, Shield, Music, MapPin, Sparkles, Gift, MessageSquare } from "lucide-react";
import { EVENTS, ARTISTS, VENUES } from "@/data/mockData";
import { showSuccess } from "@/utils/toast";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ type: string; id: string; name: string; sub: string }[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [language, setLanguage] = useState<"EN" | "PL">("EN");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Instant search logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: { type: string; id: string; name: string; sub: string }[] = [];

    // Search Events
    EVENTS.forEach(evt => {
      if (evt.title.toLowerCase().includes(query) || evt.genres.some(g => g.toLowerCase().includes(query))) {
        results.push({ type: "Event", id: evt.id, name: evt.title, sub: `${evt.city} • ${evt.genres.join(", ")}` });
      }
    });

    // Search Artists
    ARTISTS.forEach(art => {
      if (art.name.toLowerCase().includes(query) || art.genre.some(g => g.toLowerCase().includes(query))) {
        results.push({ type: "Artist", id: art.id, name: art.name, sub: `Artist • ${art.genre.join(", ")}` });
      }
    });

    // Search Venues
    VENUES.forEach(ven => {
      if (ven.name.toLowerCase().includes(query) || ven.city.toLowerCase().includes(query)) {
        results.push({ type: "Venue", id: ven.id, name: ven.name, sub: `Venue • ${ven.city}` });
      }
    });

    setSearchResults(results.slice(0, 6));
  }, [searchQuery]);

  const handleResultClick = (type: string, id: string) => {
    setShowSearchDropdown(false);
    setSearchQuery("");
    if (type === "Event") {
      const evt = EVENTS.find(e => e.id === id);
      if (evt) navigate(`/event/${evt.slug}`);
    } else if (type === "Artist") {
      navigate(`/artists?id=${id}`);
    } else if (type === "Venue") {
      navigate(`/venues?id=${id}`);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "PL" : "EN";
    setLanguage(newLang);
    showSuccess(newLang === "EN" ? "Language switched to English" : "Język zmieniony na Polski");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[2px] shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-transform group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-black">
              <Music className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <span className="text-xl font-black tracking-wider text-white uppercase">
            Rave<span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Nation</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/events" className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">Events</Link>
          <Link to="/venues" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Venues</Link>
          <Link to="/cities" className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">Cities</Link>
          <Link to="/artists" className="text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors">Artists</Link>
          <Link to="/rewards" className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">Rewards</Link>
          <Link to="/rave-finder" className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">Rave Finder</Link>
          <Link to="/community" className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">Community</Link>
          <Link to="/news" className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors">News</Link>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div ref={searchRef} className="relative hidden sm:block w-64 lg:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events, artists, genres..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full rounded-2xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-xl">
                <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Instant Results</div>
                <div className="space-y-1">
                  {searchResults.map((res) => (
                    <button
                      key={res.id}
                      onClick={() => handleResultClick(res.type, res.id)}
                      className="flex w-full items-center space-x-3 rounded-xl px-3 py-2 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                        {res.type === "Event" && <Calendar className="h-4 w-4" />}
                        {res.type === "Artist" && <Music className="h-4 w-4" />}
                        {res.type === "Venue" && <MapPin className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{res.name}</div>
                        <div className="text-xs text-gray-400 truncate">{res.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            title="Switch Language"
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">{language}</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500 animate-ping" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-black/95 p-4 shadow-2xl backdrop-blur-xl z-50">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                  <span className="text-sm font-bold text-white">Notifications</span>
                  <span className="text-xs text-purple-400 cursor-pointer hover:underline">Mark all as read</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-purple-500" />
                    <div>
                      <p className="text-xs text-white font-medium">VTSS added a new show in Warsaw!</p>
                      <p className="text-[10px] text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg p-2 hover:bg-white/5 transition-colors">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-cyan-500" />
                    <div>
                      <p className="text-xs text-white font-medium">Your ticket for Afterlife Poland is ready.</p>
                      <p className="text-[10px] text-gray-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 p-1 pr-3 hover:bg-white/10 transition-all"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                alt="User Avatar"
                className="h-7 w-7 rounded-full object-cover border border-purple-500/50"
              />
              <span className="hidden md:block text-xs font-semibold text-white">Kamil</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-xl z-50">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-sm font-bold text-white">Kamil Nowak</p>
                  <p className="text-xs text-gray-400">kamil@ravenation.pl</p>
                  <div className="mt-1.5 flex items-center space-x-1 text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full w-fit">
                    <Sparkles className="h-3 w-3" />
                    <span>450 Rave Points</span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <Link
                    to="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User className="h-4 w-4 text-purple-400" />
                    <span>My Dashboard</span>
                  </Link>
                  <Link
                    to="/rewards"
                    onClick={() => setShowUserMenu(false)}
                    className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Gift className="h-4 w-4 text-pink-400" />
                    <span>Rewards Shop</span>
                  </Link>
                  <Link
                    to="/dashboard?tab=organizer"
                    onClick={() => setShowUserMenu(false)}
                    className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    <span>Organizer Panel</span>
                  </Link>
                  <Link
                    to="/dashboard?tab=admin"
                    onClick={() => setShowUserMenu(false)}
                    className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Shield className="h-4 w-4 text-pink-400" />
                    <span>Admin Control</span>
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      showSuccess("Logged out successfully");
                    }}
                    className="flex w-full items-center space-x-2.5 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};