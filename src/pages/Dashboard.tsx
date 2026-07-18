import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { User, Calendar, Shield, Sparkles, Heart, Plus, BarChart3, Users, Server, CheckCircle, AlertTriangle, FileText, QrCode } from "lucide-react";
import { EVENTS, ARTISTS, VENUES, USER_PROFILE } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { showSuccess } from "@/utils/toast";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // Organizer State
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventGenre, setNewEventGenre] = useState("Techno");
  const [newEventCity, setNewEventCity] = useState("Warsaw");
  const [newEventPrice, setNewEventPrice] = useState("80");
  const [myEvents, setMyEvents] = useState([
    { id: "my-1", title: "Rave Nation: Warsaw Industrial Gathering", city: "Warsaw", status: "Published", attendees: 450 }
  ]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle.trim()) {
      const newEvt = {
        id: `my-${Date.now()}`,
        title: newEventTitle,
        city: newEventCity,
        status: "Pending Approval",
        attendees: 0
      };
      setMyEvents([...myEvents, newEvt]);
      setNewEventTitle("");
      showSuccess("Event submitted for moderation approval!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 text-center space-y-4">
            <img src={USER_PROFILE.avatar} alt="Avatar" className="h-20 w-20 rounded-full mx-auto object-cover border-2 border-purple-500" />
            <div>
              <h2 className="text-lg font-bold text-white">{USER_PROFILE.name}</h2>
              <p className="text-xs text-gray-400">{USER_PROFILE.email}</p>
            </div>
            <div className="flex justify-center items-center space-x-1 text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{USER_PROFILE.loyaltyPoints} Rave Points</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-9<dyad-write path="src/pages/Dashboard.tsx" description="Creating the complete unified Dashboard page with User Profile, Organizer Dashboard, and Admin Control Panel.">
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { User, Calendar, Shield, Sparkles, Heart, Plus, BarChart3, Users, Server, CheckCircle, AlertTriangle, FileText, QrCode, Star, MapPin, Activity } from "lucide-react";
import { EVENTS, ARTISTS, VENUES, USER_PROFILE } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { showSuccess } from "@/utils/toast";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  // Organizer State
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventGenre, setNewEventGenre] = useState("Techno");
  const [newEventCity, setNewEventCity] = useState("Warsaw");
  const [newEventPrice, setNewEventPrice] = useState("80");
  const [myEvents, setMyEvents] = useState([
    { id: "my-1", title: "Rave Nation: Warsaw Industrial Gathering", city: "Warsaw", status: "Published", attendees: 450 }
  ]);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle.trim()) {
      const newEvt = {
        id: `my-${Date.now()}`,
        title: newEventTitle,
        city: newEventCity,
        status: "Pending Approval",
        attendees: 0
      };
      setMyEvents([...myEvents, newEvt]);
      setNewEventTitle("");
      showSuccess("Event submitted for moderation approval!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Navigation */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 text-center space-y-4">
            <img src={USER_PROFILE.avatar} alt="Avatar" className="h-20 w-20 rounded-full mx-auto object-cover border-2 border-purple-500" />
            <div>
              <h2 className="text-lg font-bold text-white">{USER_PROFILE.name}</h2>
              <p className="text-xs text-gray-400">{USER_PROFILE.email}</p>
            </div>
            <div className="flex justify-center items-center space-x-1 text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{USER_PROFILE.loyaltyPoints} Rave Points</span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-2 space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex w-full items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === "profile" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("organizer")}
              className={`flex w-full items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === "organizer" ? "bg-cyan-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Organizer Panel</span>
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex w-full items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                activeTab === "admin" ? "bg-pink-600 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Shield className="h-4 w-4" />
              <span>Admin Control</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Tab: Profile */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-black uppercase tracking-wider text-white">My Profile</h1>
                <p className="text-sm text-gray-400">Manage your saved events, followed artists, and achievements.</p>
              </div>

              {/* Badges & Achievements */}
              <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-purple-400" /> Achievements & Badges
                </h3>
                <div className="flex flex-wrap gap-3">
                  {USER_PROFILE.badges.map((badge, i) => (
                    <span key={i} className="rounded-full bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-400 border border-purple-500/20">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Saved Events */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center"><Heart className="mr-2 h-5 w-5 text-pink-500" /> Saved Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {EVENTS.filter(e => USER_PROFILE.savedEvents.includes(e.id)).map((evt) => (
                    <div key={evt.id} className="flex items-center space-x-4 rounded-2xl border border-white/10 bg-zinc-900/20 p-4">
                      <img src={evt.image} alt={evt.title} className="h-16 w-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white truncate">{evt.title}</h4>
                        <p className="text-xs text-gray-400">{evt.date} • {evt.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Organizer */}
          {activeTab === "organizer" && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-black uppercase tracking-wider text-white">Organizer Dashboard</h1>
                <p className="text-sm text-gray-400">Submit new events, manage lineups, and view ticket analytics.</p>
              </div>

              {/* Submit Event Form */}
              <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 space-y-6">
                <h3 className="text-base font-bold text-white flex items-center"><Plus className="mr-2 h-5 w-5 text-cyan-400" /> Submit New Event</h3>
                <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Event Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Techno Warehouse Ritual"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Genre</label>
                    <select
                      value={newEventGenre}
                      onChange={(e) => setNewEventGenre(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-cyan-500"
                    >
                      <option value="Techno">Techno</option>
                      <option value="Hard Techno">Hard Techno</option>
                      <option value="Melodic Techno">Melodic Techno</option>
                      <option value="Psytrance">Psytrance</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">City</label>
                    <input
                      type="text"
                      value={newEventCity}
                      onChange={(e) => setNewEventCity(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Ticket Price (PLN)</label>
                    <input
                      type="number"
                      value={newEventPrice}
                      onChange={(e) => setNewEventPrice(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button type="submit" className="md:col-span-2 rounded-full bg-cyan-600 py-3 text-sm font-bold text-white hover:bg-cyan-500 transition-all">
                    Submit Event
                  </button>
                </form>
              </div>

              {/* My Events List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-cyan-400" /> My Events</h3>
                <div className="space-y-3">
                  {myEvents.map((evt) => (
                    <div key={evt.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/20 p-4">
                      <div>
                        <h4 className="font-bold text-white">{evt.title}</h4>
                        <p className="text-xs text-gray-400">{evt.city} • {evt.attendees} Attendees</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        evt.status === "Published" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {evt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Admin */}
          {activeTab === "admin" && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-black uppercase tracking-wider text-white">Admin Control Panel</h1>
                <p className="text-sm text-gray-400">Monitor platform health, approve pending events, and manage users.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Users</span>
                    <Users className="h-5 w-5 text-pink-400" />
                  </div>
                  <span className="block text-2xl font-black text-white">12,450</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Server Health</span>
                    <Server className="h-5 w-5 text-green-400" />
                  </div>
                  <span className="block text-2xl font-black text-green-400">99.9%</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Pending Approvals</span>
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <span className="block text-2xl font-black text-yellow-400">3</span>
                </div>
              </div>

              {/* System Logs */}
              <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center"><Activity className="mr-2 h-5 w-5 text-pink-400" /> System Audit Logs</h3>
                <div className="space-y-3 text-xs font-mono text-gray-400">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>[14:32:10] User 'Kamil N.' updated profile settings.</span>
                    <span className="text-green-400">SUCCESS</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>[13:15:45] Event 'Warsaw Industrial Gathering' published.</span>
                    <span className="text-green-400">SUCCESS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>[12:00:01] Automated database backup completed.</span>
                    <span className="text-cyan-400">INFO</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;