import React, { useState } from "react";
import { MapPin, Star, Shield, Volume2, Sparkles, Clock } from "lucide-react";
import { VENUES, CITIES } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Venues = () => {
  const [selectedCity, setSelectedCity] = useState<string>("All");

  const filteredVenues = VENUES.filter((ven) => {
    return selectedCity === "All" || ven.city === selectedCity;
  });

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
            onClick={() => setSelectedCity("All")}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCity === "All" ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-400 hover:text-white"
            }`}
          >
            All Cities
          </button>
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCity === city ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredVenues.map((ven) => (
            <div
              key={ven.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-6 space-y-6 transition-all hover:border-cyan-500/50"
            >
              <div className="relative h-64 overflow-hidden rounded-2xl">
                <img src={ven.image} alt={ven.name} className="h-full w-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-cyan-400 border border-white/10 uppercase tracking-wider">
                    {ven.city}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center space-x-1 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-yellow-400 border border-white/10">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span>{ven.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">{ven.name}</h2>
                  <p className="text-xs text-gray-400 flex items-center"><MapPin className="mr-1 h-3.5 w-3.5 text-pink-400" /> {ven.address}</p>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">{ven.description}</p>

                {/* Technical Specs */}
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                      <Volume2 className="mr-1 h-3.5 w-3.5 text-cyan-400" /> Sound System
                    </span>
                    <p className="text-xs text-white font-medium">{ven.soundSystem}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                      <Sparkles className="mr-1 h-3.5 w-3.5 text-pink-400" /> Lighting
                    </span>
                    <p className="text-xs text-white font-medium">{ven.lightingSystem}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                      <Shield className="mr-1 h-3.5 w-3.5 text-purple-400" /> Dress Code
                    </span>
                    <p className="text-xs text-white font-medium">{ven.dressCode}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                      <Clock className="mr-1 h-3.5 w-3.5 text-cyan-400" /> Hours
                    </span>
                    <p className="text-xs text-white font-medium">{ven.openingHours}</p>
                  </div>
                </div>

                {/* Facilities */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {ven.facilities.map((fac, i) => (
                    <span key={i} className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-gray-400 border border-white/5">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Venues;