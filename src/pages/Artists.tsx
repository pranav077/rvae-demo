import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Music, Globe, Instagram, Award, Disc, Users } from "lucide-react";
import { ARTISTS } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Artists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const artistId = searchParams.get("id");
  
  const [selectedArtist, setSelectedArtist] = useState(ARTISTS[0]);

  useEffect(() => {
    if (artistId) {
      const artist = ARTISTS.find((a) => a.id === artistId);
      if (artist) {
        setSelectedArtist(artist);
      }
    }
  }, [artistId]);

  const handleArtistSelect = (artist: typeof ARTISTS[0]) => {
    setSelectedArtist(artist);
    setSearchParams({ id: artist.id });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Artist List */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black uppercase tracking-wider text-white">
              Artist <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Database</span>
            </h1>
            <p className="text-sm text-gray-400">Discover the DJs and producers shaping the electronic music scene.</p>
          </div>

          <div className="space-y-3">
            {ARTISTS.map((art) => (
              <button
                key={art.id}
                onClick={() => handleArtistSelect(art)}
                className={`flex w-full items-center space-x-4 rounded-2xl border p-4 text-left transition-all ${
                  selectedArtist.id === art.id
                    ? "border-pink-500 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                    : "border-white/10 bg-zinc-900/20 hover:border-white/20"
                }`}
              >
                <img src={art.image} alt={art.name} className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-white">{art.name}</h3>
                  <p className="text-xs text-gray-400">{art.genre.slice(0, 2).join(", ")}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Artist Profile Detail */}
        <div className="lg:col-span-2 space-y-8 rounded-3xl border border-white/10 bg-zinc-900/30 p-6 sm:p-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <img src={selectedArtist.image} alt={selectedArtist.name} className="h-32 w-32 rounded-2xl object-cover border-2 border-pink-500/50" />
            <div className="space-y-3 text-center sm:text-left">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-white">{selectedArtist.name}</h2>
                <p className="text-sm text-pink-400 font-semibold">{selectedArtist.genre.join(" • ")}</p>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-gray-400">
                <span className="flex items-center"><Globe className="mr-1 h-4 w-4 text-purple-400" /> {selectedArtist.country}</span>
                <span className="flex items-center"><Users className="mr-1 h-4 w-4 text-cyan-400" /> {selectedArtist.followers.toLocaleString()} Followers</span>
              </div>
              <div className="flex justify-center sm:justify-start space-x-3">
                <a href={selectedArtist.spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-green-400 hover:underline">Spotify</a>
                <a href={selectedArtist.soundcloudUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-orange-400 hover:underline">SoundCloud</a>
                <a href={selectedArtist.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-pink-400 hover:underline">Instagram</a>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white border-l-4 border-pink-500 pl-3">Biography</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{selectedArtist.bio}</p>
          </div>

          {/* Achievements */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white border-l-4 border-purple-500 pl-3">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedArtist.achievements.map((ach, i) => (
                <div key={i} className="flex items-center space-x-2 rounded-xl border border-white/5 bg-zinc-900/20 p-3">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="text-xs text-gray-300 font-medium">{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discography */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white border-l-4 border-cyan-500 pl-3">Discography</h3>
            <div className="space-y-2">
              {selectedArtist.discography.map((disc, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/10 p-3">
                  <div className="flex items-center space-x-3">
                    <Music className="h-5 w-5 text-cyan-400" />
                    <div>
                      <span className="block text-sm font-bold text-white">{disc.title}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{disc.type}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">{disc.year}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Artists;