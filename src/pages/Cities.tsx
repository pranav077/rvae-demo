import React, { useState } from "react";
import { MapPin, Calendar, Star, Music, Compass, Utensils, Sparkles } from "lucide-react";
import { EVENTS, VENUES, ARTISTS, CITIES } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";

interface CityGuide {
  description: string;
  prePartySpot: string;
  lateNightFood: string;
  vibe: string;
}

const CITY_GUIDES: Record<string, CityGuide> = {
  Warsaw: {
    description: "The undisputed capital of Polish techno. From massive industrial warehouse raves to intimate underground basements, Warsaw offers a relentless 24/7 clubbing experience with world-class sound systems.",
    prePartySpot: "Pawilony Nowy Świat or Wisła Boulevards (Summer)",
    lateNightFood: "Kebab King or Hala Koszyki",
    vibe: "Industrial, Raw, Fast-paced, All-night"
  },
  Kraków: {
    description: "Housed in historic medieval cellars and old industrial quarters like Zabłocie, Kraków's electronic scene is intimate, mysterious, and deeply atmospheric, focusing on deep house, minimal, and hypnotic techno.",
    prePartySpot: "Plac Nowy (Kazimierz)",
    lateNightFood: "Zapiekanki at Plac Nowy",
    vibe: "Hypnotic, Atmospheric, Underground, Cozy"
  },
  Wrocław: {
    description: "Known for its inclusive, community-driven scene. Wrocław's clubs are safe spaces dedicated to pure dancefloor expression, featuring exceptional local collectives and high-fidelity sound systems.",
    prePartySpot: "Neon Side Gallery or Słodowa Island",
    lateNightFood: "Pasibus or late-night pierogi",
    vibe: "Inclusive, High-fidelity, Friendly, Energetic"
  },
  Poznań: {
    description: "A city with a massive concert and festival culture. Poznań hosts some of the largest electronic music events in Poland, blending historic ballroom venues with modern warehouse spaces.",
    prePartySpot: "KontenerART (Summer) or Wrocławska Street",
    lateNightFood: "Pyra bar or local street food",
    vibe: "Concert-scale, Vibrant, Melodic, Diverse"
  },
  Gdańsk: {
    description: "The seaside electronic hub. Gdańsk's scene truly shines in the summer with open-air shipyard raves, beach parties, and industrial warehouse events in the historic shipyard district.",
    prePartySpot: "100cznia or Elektryków Street",
    lateNightFood: "Fish & Chips by the Motława or local food halls",
    vibe: "Industrial Shipyard, Open-air, Summer Vibes, Electro"
  }
};

const Cities = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>("Warsaw");

  const cityGuide = CITY_GUIDES[selectedCity] || {
    description: "A vibrant hub for electronic music lovers with a growing community of local DJs, promoters, and underground venues.",
    prePartySpot: "Local market squares and craft beer bars",
    lateNightFood: "Local late-night diners and street food",
    vibe: "Underground, Welcoming, Energetic"
  };

  const localEvents = EVENTS.filter(e => e.city === selectedCity);
  const localVenues = VENUES.filter(v => v.city === selectedCity);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
            City <span className="bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">Nightlife Guides</span>
          </h1>
          <p className="text-sm text-gray-400">Your ultimate guide to the electronic music culture across Poland's major cities.</p>
        </div>

        {/* City Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCity === city ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* City Guide Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Guide & Recommendations */}
          <div className="lg:col-span-1 space-y-6 rounded-3xl border border-white/10 bg-zinc-900/30 p-6 sm:p-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center">
                <Compass className="mr-1.5 h-4 w-4" /> Local Vibe
              </span>
              <h2 className="text-3xl font-black text-white">{selectedCity}</h2>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{cityGuide.vibe}</p>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">{cityGuide.description}</p>

            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 text-purple-400" /> Best Pre-Party Spot
                </span>
                <p className="text-xs text-white font-medium">{cityGuide.prePartySpot}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 flex items-center">
                  <Utensils className="mr-1.5 h-3.5 w-3.5 text-cyan-400" /> Late-Night Food
                </span>
                <p className="text-xs text-white font-medium">{cityGuide.lateNightFood}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Local Events & Venues */}
          <div className="lg:col-span-2 space-y-8">
            {/* Local Events */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-wider text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-400" /> Upcoming Events in {selectedCity}
              </h3>
              {localEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {localEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => navigate(`/event/${evt.slug}`)}
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/20 p-3 transition-all hover:border-purple-500/50"
                    >
                      <div className="relative h-40 overflow-hidden rounded-xl">
                        <img src={evt.image} alt={evt.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-3 space-y-1">
                        <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors truncate">{evt.title}</h4>
                        <p className="text-xs text-gray-400">{evt.date} • {evt.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No upcoming events listed for this city yet. Check back soon!</p>
              )}
            </div>

            {/* Local Venues */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-wider text-white flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-cyan-400" /> Legendary Venues in {selectedCity}
              </h3>
              {localVenues.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {localVenues.map((ven) => (
                    <div
                      key={ven.id}
                      onClick={() => navigate(`/venues?id=${ven.id}`)}
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/20 p-3 transition-all hover:border-cyan-500/50"
                    >
                      <div className="relative h-40 overflow-hidden rounded-xl">
                        <img src={ven.image} alt={ven.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-3 space-y-1">
                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{ven.name}</h4>
                        <p className="text-xs text-gray-400">{ven.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No venues listed for this city yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cities;