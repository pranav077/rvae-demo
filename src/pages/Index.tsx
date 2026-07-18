import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Flame, Star, Users, Award, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { EVENTS, NEWS, VENUES, ARTISTS } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { showSuccess } from "@/utils/toast";

const Index = () => {
  const navigate = useNavigate();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [email, setEmail] = useState("");
  const featuredEvents = EVENTS.filter(e => e.isFeatured);

  // Auto-rotate hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % featuredEvents.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredEvents.length]);

  // Countdown timer for the active featured event
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(featuredEvents[currentHeroIndex]?.date + "T23:00:00").getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [currentHeroIndex, featuredEvents]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      showSuccess("Welcome to the Rave Nation newsletter!");
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {featuredEvents.map((evt, idx) => (
          <div
            key={evt.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentHeroIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <img
              src={evt.image}
              alt={evt.title}
              className="h-full w-full object-cover scale-105 animate-[pulse_8s_infinite_alternate]"
            />

            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20 z-20 max-w-7xl mx-auto">
              <div className="max-w-3xl space-y-6">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-400 border border-purple-500/30 uppercase tracking-wider">
                    <Sparkles className="mr-1 h-3.5 w-3.5" /> Featured Event
                  </span>
                  {evt.isSoldOut && (
                    <span className="inline-flex items-center rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/30 uppercase tracking-wider">
                      Sold Out
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-6xl text-white uppercase drop-shadow-lg">
                  {evt.title}
                </h1>

                <p className="text-lg text-gray-300 line-clamp-2 max-w-2xl">
                  {evt.description}
                </p>

                {/* Countdown Timer */}
                <div className="flex space-x-4 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-fit">
                  <div className="text-center">
                    <span className="block text-2xl sm:text-3xl font-black text-purple-400">{timeLeft.days}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">Days</span>
                  </div>
                  <div className="text-center border-l border-white/10 pl-4">
                    <span className="block text-2xl sm:text-3xl font-black text-cyan-400">{timeLeft.hours}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">Hours</span>
                  </div>
                  <div className="text-center border-l border-white/10 pl-4">
                    <span className="block text-2xl sm:text-3xl font-black text-pink-400">{timeLeft.minutes}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">Mins</span>
                  </div>
                  <div className="text-center border-l border-white/10 pl-4">
                    <span className="block text-2xl sm:text-3xl font-black text-purple-400">{timeLeft.seconds}</span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400">Secs</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/event/${evt.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all"
                  >
                    Get Tickets <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/events"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
                  >
                    Explore All Events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <div className="absolute bottom-6 right-6 z-30 flex space-x-2">
          <button
            onClick={() => setCurrentHeroIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white hover:bg-black/60 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentHeroIndex((prev) => (prev + 1) % featuredEvents.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white hover:bg-black/60 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-24">
        
        {/* Trending Events */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white flex items-center">
                <Flame className="mr-2 h-6 w-6 text-pink-500 animate-bounce" /> Trending Events
              </h2>
              <p className="text-sm text-gray-400">The hottest dancefloors in Poland right now</p>
            </div>
            <Link to="/events" className="text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map((evt) => (
              <div
                key={evt.id}
                onClick={() => navigate(`/event/${evt.slug}`)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-3 transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
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
            ))}
          </div>
        </section>

        {/* Popular Venues */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white flex items-center">
                <Star className="mr-2 h-6 w-6 text-cyan-400" /> Legendary Venues
              </h2>
              <p className="text-sm text-gray-400">Explore Poland's premier electronic music spaces</p>
            </div>
            <Link to="/venues" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENUES.map((ven) => (
              <div
                key={ven.id}
                onClick={() => navigate(`/venues?id=${ven.id}`)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 transition-all hover:border-cyan-500/50"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={ven.image}
                    alt={ven.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                      {ven.city}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">{ven.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{ven.address}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Statistics */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 p-8 sm:p-12">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center"><Users className="h-8 w-8 text-purple-400" /></div>
              <span className="block text-3xl sm:text-4xl font-black text-white">50k+</span>
              <span className="text-xs uppercase tracking-wider text-gray-400">Active Ravers</span>
            </div>
            <div className="space-y-2 border-l border-white/10">
              <div className="flex justify-center"><Calendar className="h-8 w-8 text-cyan-400" /></div>
              <span className="block text-3xl sm:text-4xl font-black text-white">1,200+</span>
              <span className="text-xs uppercase tracking-wider text-gray-400">Events Listed</span>
            </div>
            <div className="space-y-2 border-l border-white/10">
              <div className="flex justify-center"><Star className="h-8 w-8 text-pink-400" /></div>
              <span className="block text-3xl sm:text-4xl font-black text-white">85+</span>
              <span className="text-xs uppercase tracking-wider text-gray-400">Verified Venues</span>
            </div>
            <div className="space-y-2 border-l border-white/10">
              <div className="flex justify-center"><Award className="h-8 w-8 text-purple-400" /></div>
              <span className="block text-3xl sm:text-4xl font-black text-white">300+</span>
              <span className="text-xs uppercase tracking-wider text-gray-400">Polish Artists</span>
            </div>
          </div>
        </section>

        {/* Latest News */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white flex items-center">
                <Sparkles className="mr-2 h-6 w-6 text-purple-400" /> News & Editorial
              </h2>
              <p className="text-sm text-gray-400">Stay updated with the Polish electronic music scene</p>
            </div>
            <Link to="/news" className="text-sm font-bold text-purple-400 hover:text-purple-300 flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((art) => (
              <div
                key={art.id}
                onClick={() => navigate(`/news?id=${art.id}`)}
                className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/20 transition-all hover:border-purple-500/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-400 border border-purple-500/30 uppercase tracking-wider">
                      {art.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <span className="text-xs text-gray-400">{art.date} • {art.readTime}</span>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{art.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
          
          <div className="relative max-w-xl mx-auto space-y-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">Join the Rave Nation</h2>
            <p className="text-sm text-gray-400">
              Subscribe to get weekly updates on upcoming events, exclusive ticket pre-sales, and the latest news from the Polish underground.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-3 text-sm font-bold text-white hover:scale-105 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default Index;