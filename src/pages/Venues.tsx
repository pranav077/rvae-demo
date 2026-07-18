import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Shield, Volume2, Sparkles, Clock, Calendar } from "lucide-react";
import { VENUES, CITIES, EVENTS } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Venues = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const venueId = searchParams.get("id");

  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedVenue, setSelectedVenue] = useState(VENUES[0]);

  useEffect(() => {
    if (venueId) {
      const venue = VENUES.find((v) => v.id === venueId);
      if (venue) {
        setSelectedVenue(venue);
        setSelectedCity(venue.city);
      }
    }
  }, [venueId]);

  const filteredVenues = VENUES.filter((ven) => {
    return selectedCity === "All" || ven.city === selectedCity;
  });

  const handleVenueSelect = (venue: typeof VENUES[0]) => {
    setSelectedVenue(venue);
    setSearchParams({ id: venue.id });
  };

  const upcomingEvents = EVENTS.filter((e) => e.venueId === selectedVenue.id);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
            Legendary <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Venues</span>
          </h1>
          <p className="text-sm text-gray-400">Explore Poland's premier clubs, warehouses, and electronic music spaces.</p>
        </div>

        {/* City Filter Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => {
              setSelectedCity("All");
              setSearchParams({});
            }}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCity === "All" ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All Cities
          </button>
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => {
                setSelectedCity(city);
                const firstInCity = VENUES.find(v => v.city === city);
                if (firstInCity) {
                  handleVenueSelect(firstInCity);
                }
              }}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCity === city ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Venues Grid & Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Venue List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Select a Venue</h3>
            <div className="space-y-3">
              {filteredVenues.map((ven) => (
                <button
                  key={ven.id}
                  onClick={() => handleVenueSelect(ven)}
                  className={`flex w-full items-center space-x-4 rounded-2xl border p-4 text-left transition-all ${
                    selectedVenue.id === ven.id
                      ? "border-cyan-500 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "border-white/10 bg-zinc-900/20 hover:border-white/20"
                  }`}
                >
                  <img src={ven.image} alt={ven.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white truncate">{ven.name}</h4>
                    <p className="text-xs text-gray-400 truncate">{ven.city}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Venue Profile Detail */}
          <div className="lg:col-span-2 space-y-8 rounded-3xl border border-white/10 bg-zinc-900/30 p-6 sm:p-8">
            
            {/* Header Image */}
            <div className="relative h-64 overflow-hidden rounded-2xl border border-white/10">
              <img src={selectedVenue.image} alt={selectedVenue.name} className="h-full w-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-cyan-400 border border-white/10 uppercase tracking-wider">
                  {selectedVenue.city}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center space-x-1 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-yellow-400 border border-white/10">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>{selectedVenue.rating}</span>
              </div>
            </div>

            {/* Venue Info */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-white">{selectedVenue.name}</h2>
                <p className="text-sm text-gray-400 flex items-center">
                  <MapPin className="mr-1.5 h-4 w-4 text-pink-400" /> {selectedVenue.address}
                </p>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">{selectedVenue.description}</p>

              {/* Technical Specs */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                    <Volume2 className="mr-1.5 h-3.5 w-3.5 text-cyan-400" /> Sound System
                  </span>
                  <p className="text-xs text-white font-medium">{selectedVenue.soundSystem}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                    <Sparkles className="mr-1.5 h-3.5 w-3.5 text-pink-400" /> Lighting
                  </span>
                  <p className="text-xs text-white font-medium">{selectedVenue.lightingSystem}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                    <Shield className="mr-1.5 h-3.5 w-3.5 text-purple-400" /> Dress Code
                  </span>
                  <p className="text-xs text-white font-medium">{selectedVenue.dressCode}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                    <Clock className="mr-1.5 h-3.5 w-3.5 text-cyan-400" /> Hours
                  </span>
                  <p className="text-xs text-white font-medium">{selectedVenue.openingHours}</p>
                </div>
              </div>

              {/* Facilities */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Facilities</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedVenue.facilities.map((fac, i) => (
                    <span key={i} className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-gray-400 border border-white/5">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Upcoming Events at Venue */}
              <div className="space-y-4 border-t border-white/10 pt-6">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-cyan-400" /> Upcoming Events here
                </h3>
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {upcomingEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => navigate(`/event/${evt.slug}`)}
                        className="group cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-zinc-900/20 p-3 transition-all hover:border-cyan-500/30"
                      >
                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors truncate text-sm">{evt.title}</h4>
                        <p className="text-[10px] text-gray-400">{evt.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">No upcoming events scheduled at this venue.</p>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Venues;