import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin, SlidersHorizontal, X, Sparkles, Flame } from "lucide-react";
import { EVENTS, CITIES, GENRES } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Events = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(200);
  const [onlyFree, setOnlyFree] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredEvents = EVENTS.filter((evt) => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      evt.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = selectedCity === "All" || evt.city === selectedCity;
    const matchesGenre = selectedGenre === "All" || evt.genres.includes(selectedGenre);
    const matchesPrice = evt.price <= priceRange;
    const matchesFree = !onlyFree || evt.isFree;

    return matchesSearch && matchesCity && matchesGenre && matchesPrice && matchesFree;
  });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("All");
    setSelectedGenre("All");
    setPriceRange(200);
    setOnlyFree(false);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
            Discover <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-sm text-gray-400">Find the best electronic music events, festivals, and club nights in Poland.</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by event name, artist, genre, or promoter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
            >
              <SlidersHorizontal className="h-4 w-4 text-purple-400" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-6 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-base font-bold text-white">Advanced Filters</h3>
                <button onClick={resetFilters} className="text-xs font-bold text-purple-400 hover:underline flex items-center">
                  <X className="mr-1 h-3 w-3" /> Reset All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* City Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-3 text-sm text-white outline-none focus:border-purple-500"
                  >
                    <option value="All">All Cities</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Genre Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Genre</label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-3 text-sm text-white outline-none focus:border-purple-500"
                  >
                    <option value="All">All Genres</option>
                    {GENRES.map((genre) => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                    <span>Max Price</span>
                    <span className="text-purple-400">PLN {priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id="free-only"
                      checked={onlyFree}
                      onChange={(e) => setOnlyFree(e.target.checked)}
                      className="rounded border-white/10 bg-black text-purple-500 focus:ring-purple-500"
                    />
                    <label htmlFor="free-only" className="text-xs text-gray-400 cursor-pointer">Show Free Events Only</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => navigate(`/event/${evt.slug}`)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-3 transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              >
                <div className="relative h-56 overflow-hidden rounded-2xl">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {evt.genres.slice(0, 2).map((g, i) => (
                      <span key={i} className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-purple-400 border border-white/10 uppercase tracking-wider">
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/10">
                    {evt.isFree ? "FREE" : `From PLN ${evt.price}`}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center"><Calendar className="mr-1 h-3.5 w-3.5 text-purple-400" /> {evt.date}</span>
                    <span className="flex items-center"><MapPin className="mr-1 h-3.5 w-3.5 text-cyan-400" /> {evt.city}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {evt.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 space-y-4">
              <p className="text-lg text-gray-400">No events found matching your criteria.</p>
              <button onClick={resetFilters} className="rounded-full bg-purple-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-purple-500 transition-all">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;