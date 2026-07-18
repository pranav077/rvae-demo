import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, Shield, AlertTriangle, Car, Train, Hotel, HelpCircle, Share2, Heart, Star, MessageSquare, QrCode, CloudSun } from "lucide-react";
import { EVENTS, VENUES, ARTISTS } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { showSuccess } from "@/utils/toast";

const EventDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Ania S.", text: "Can't wait for this! The lineup is absolutely insane.", date: "2 hours ago" },
    { id: 2, user: "Tomek K.", text: "Is anyone driving from Kraków? Looking for a ride share!", date: "1 day ago" }
  ]);

  const event = EVENTS.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20 space-y-4">
          <h1 className="text-3xl font-black">Event Not Found</h1>
          <Link to="/events" className="text-purple-400 hover:underline">Back to Events</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const venue = VENUES.find((v) => v.id === event.venueId);
  const lineupArtists = ARTISTS.filter((a) => event.lineup.includes(a.id));

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    showSuccess(isSaved ? "Removed from saved events" : "Added to saved events!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess("Event link copied to clipboard!");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      setComments([{ id: Date.now(), user: "Kamil N.", text: commentText, date: "Just now" }, ...comments]);
      setCommentText("");
      showSuccess("Comment posted!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-4 pb-8 sm:px-6 lg:px-8 z-20 max-w-7xl mx-auto">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {event.genres.map((g, i) => (
                <span key={i} className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-400 border border-purple-500/30 uppercase tracking-wider">
                  {g}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              <span className="flex items-center"><Calendar className="mr-1.5 h-4 w-4 text-purple-400" /> {event.date}</span>
              <span className="flex items-center"><Clock className="mr-1.5 h-4 w-4 text-cyan-400" /> {event.time}</span>
              <span className="flex items-center"><MapPin className="mr-1.5 h-4 w-4 text-pink-400" /> {venue?.name}, {event.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Details, Lineup, Info */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Description */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white border-l-4 border-purple-500 pl-3">About the Event</h2>
            <p className="text-gray-300 leading-relaxed">{event.description}</p>
          </section>

          {/* Lineup */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white border-l-4 border-cyan-500 pl-3">Lineup</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {lineupArtists.map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigate(`/artists?id=${art.id}`)}
                  className="group flex items-center space-x-4 rounded-2xl border border-white/10 bg-zinc-900/30 p-4 cursor-pointer hover:border-cyan-500/50 transition-all"
                >
                  <img src={art.image} alt={art.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{art.name}</h3>
                    <p className="text-xs text-gray-400">{art.genre.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timetable / Schedule */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white border-l-4 border-pink-500 pl-3">Timetable</h2>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-sm font-bold text-gray-400">23:00 - 01:00</span>
                <span className="text-sm font-bold text-white">Local Support DJ</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="text-sm font-bold text-purple-400">01:00 - 03:00</span>
                <span className="text-sm font-bold text-white">{lineupArtists[0]?.name || "Special Guest"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-cyan-400">03:00 - End</span>
                <span className="text-sm font-bold text-white">{lineupArtists[1]?.name || "Closing Act"}</span>
              </div>
            </div>
          </section>

          {/* Event Rules & Prohibited Items */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center"><Shield className="mr-2 h-5 w-5 text-purple-400" /> Event Rules</h3>
              <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
                {event.rules.map((rule, i) => <li key={i}>{rule}</li>)}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center"><AlertTriangle className="mr-2 h-5 w-5 text-pink-400" /> Prohibited Items</h3>
              <ul className="space-y-2 text-sm text-gray-300 list-disc pl-5">
                {event.prohibitedItems.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </section>

          {/* Logistics: Parking, Transportation, Hotels */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white border-l-4 border-purple-500 pl-3">Logistics & Travel</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-5 space-y-2">
                <div className="flex items-center space-x-2 text-purple-400">
                  <Car className="h-5 w-5" />
                  <h4 className="font-bold text-white">Parking</h4>
                </div>
                <p className="text-xs text-gray-400">{event.parking}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-5 space-y-2">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Train className="h-5 w-5" />
                  <h4 className="font-bold text-white">Transit</h4>
                </div>
                <p className="text-xs text-gray-400">{event.transportation}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-5 space-y-2">
                <div className="flex items-center space-x-2 text-pink-400">
                  <Hotel className="h-5 w-5" />
                  <h4 className="font-bold text-white">Hotels</h4>
                </div>
                <p className="text-xs text-gray-400">{event.hotels[0]?.name} ({event.hotels[0]?.distance})</p>
              </div>
            </div>
          </section>

          {/* Comments & Reviews */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-wider text-white border-l-4 border-cyan-500 pl-3">Community Discussion</h2>
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                placeholder="Join the discussion..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder-gray-400 outline-none focus:border-purple-500 transition-all"
                rows={3}
              />
              <button type="submit" className="rounded-full bg-purple-600 px-6 py-2 text-sm font-bold text-white hover:bg-purple-500 transition-all">
                Post Comment
              </button>
            </form>

            <div className="space-y-4">
              {comments.map((c) => (
                <div key={c.id} className="rounded-2xl border border-white/5 bg-zinc-900/10 p-4 space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="font-bold text-white">{c.user}</span>
                    <span>{c.date}</span>
                  </div>
                  <p className="text-sm text-gray-300">{c.text}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Ticket Widget, Weather, Map */}
        <div className="space-y-8">
          
          {/* Ticket Widget */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 space-y-6 sticky top-24">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Ticket Price</span>
              <span className="text-2xl font-black text-purple-400">{event.isFree ? "FREE" : `PLN ${event.price}`}</span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSaveToggle}
                className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all ${
                  isSaved ? "bg-pink-500/20 text-pink-500 border-pink-500/30" : "bg-white/5 text-gray-300 hover:text-white"
                }`}
              >
                <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => showSuccess("Redirecting to secure ticket checkout...")}
                disabled={event.isSoldOut}
                className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 py-3 text-sm font-bold text-white hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {event.isSoldOut ? "Sold Out" : "Buy Tickets"}
              </button>
            </div>

            {/* QR Code Generation */}
            <div className="border-t border-white/10 pt-6 flex flex-col items-center space-y-3 text-center">
              <QrCode className="h-24 w-24 text-white" />
              <span className="text-xs text-gray-400">Scan to view event on mobile</span>
            </div>
          </div>

          {/* Weather Widget */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center">
              <CloudSun className="mr-2 h-5 w-5 text-cyan-400" /> Weather Forecast
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-2xl font-black text-white">22°C</span>
                <span className="text-xs text-gray-400">Clear Sky • Perfect for dancing</span>
              </div>
              <CloudSun className="h-10 w-10 text-yellow-400" />
            </div>
          </div>

          {/* Interactive Map Mock */}
          <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-pink-400" /> Venue Location
            </h3>
            <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center text-center p-4 space-y-2">
                <MapPin className="h-8 w-8 text-pink-500 animate-bounce" />
                <span className="text-xs font-bold text-white">{venue?.name}</span>
                <span className="text-[10px] text-gray-400">{venue?.address}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;