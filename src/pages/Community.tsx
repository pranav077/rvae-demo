import React, { useState } from "react";
import { MessageSquare, Share2, Plus, Search, Filter, MapPin, Calendar, Tag, Users, Car, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { showSuccess, showError } from "@/utils/toast";

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: "Ride Share" | "Ticket Swap" | "Meetup" | "General";
  event: string;
  city: string;
  date: string;
  replies: number;
  upvotes: number;
}

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    title: "Driving from Warsaw to Poznań for Afterlife - 3 seats open!",
    content: "Hey everyone! I'm driving down to Poznań on Saturday afternoon (June 21st) for the Afterlife event at Tama. Leaving around 15:00 from Metro Wilanowska. Split fuel costs. Good techno playlist guaranteed!",
    author: "Tomasz K.",
    category: "Ride Share",
    event: "Afterlife Poland: Melodic Odyssey",
    city: "Warsaw",
    date: "Just now",
    replies: 4,
    upvotes: 12
  },
  {
    id: "post-2",
    title: "Looking for 1x Ticket to Warsaw Industrial Gathering",
    content: "Missed out on the ticket release for the Industrial Gathering at Jasna 1. If anyone has a spare General Admission ticket they want to swap or sell, please let me know! Can pay via BLIK instantly.",
    author: "Marta W.",
    category: "Ticket Swap",
    event: "Rave Nation: Warsaw Industrial Gathering",
    city: "Warsaw",
    date: "2 hours ago",
    replies: 2,
    upvotes: 5
  },
  {
    id: "post-3",
    title: "Pre-party meetup at Wisła Boulevards before Jasna 1",
    content: "A few of us are meeting up by the river for some drinks and music before heading to Jasna 1 tonight. Anyone is welcome to join! We'll be near the Poniatowski bridge from 20:00.",
    author: "Ania S.",
    category: "Meetup",
    event: "Rave Nation: Warsaw Industrial Gathering",
    city: "Warsaw",
    date: "5 hours ago",
    replies: 8,
    upvotes: 18
  },
  {
    id: "post-4",
    title: "Best earplugs for industrial techno events?",
    content: "My ears have been ringing after the last few warehouse raves. What high-fidelity earplugs do you guys recommend that protect hearing but don't ruin the sound quality of the Lambda Labs systems?",
    author: "Kamil N.",
    category: "General",
    event: "N/A",
    city: "Kraków",
    date: "1 day ago",
    replies: 15,
    upvotes: 24
  }
];

const Community = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<"Ride Share" | "Ticket Swap" | "Meetup" | "General">("General");
  const [newEvent, setNewEvent] = useState("");
  const [newCity, setNewCity] = useState("Warsaw");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showError("Please fill in all required fields.");
      return;
    }

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      content: newContent,
      author: "Kamil Nowak",
      category: newCategory,
      event: newEvent || "N/A",
      city: newCity,
      date: "Just now",
      replies: 0,
      upvotes: 1
    };

    setPosts([newPost, ...posts]);
    setShowCreateModal(false);
    setNewTitle("");
    setNewContent("");
    setNewEvent("");
    showSuccess("Community post published successfully!");
  };

  const handleUpvote = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
    showSuccess("Post upvoted!");
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.event.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
              Rave <span className="bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">Community</span>
            </h1>
            <p className="text-sm text-gray-400">Coordinate ride shares, swap tickets, find pre-party meetups, and connect with fellow ravers.</p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Post
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search community posts, events, or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {["All", "Ride Share", "Ticket Swap", "Meetup", "General"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 space-y-4 hover:border-purple-500/30 transition-all"
              >
                {/* Post Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      post.category === "Ride Share" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                      post.category === "Ticket Swap" ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" :
                      post.category === "Meetup" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                      "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                    }`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">Posted by <span className="text-white font-semibold">{post.author}</span> • {post.date}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span className="flex items-center"><MapPin className="mr-1 h-3.5 w-3.5 text-pink-400" /> {post.city}</span>
                    {post.event !== "N/A" && (
                      <span className="flex items-center"><Tag className="mr-1 h-3.5 w-3.5 text-purple-400" /> {post.event}</span>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white hover:text-purple-400 transition-colors cursor-pointer">{post.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{post.content}</p>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleUpvote(post.id)}
                      className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      <span>🔺</span>
                      <span>{post.upvotes} Upvotes</span>
                    </button>
                    <button
                      onClick={() => showSuccess("Opening discussion thread...")}
                      className="flex items-center space-x-1.5 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      <MessageSquare className="h-4 w-4 text-purple-400" />
                      <span>{post.replies} Replies</span>
                    </button>
                  </div>

                  <button
                    onClick={() => showSuccess("Contact details copied to clipboard!")}
                    className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-bold text-white hover:bg-white/10 transition-all"
                  >
                    Contact Poster
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-4">
              <p className="text-lg text-gray-400">No community posts found matching your criteria.</p>
              <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="rounded-full bg-purple-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-purple-500 transition-all">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Create Post Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase tracking-wider text-white">Create Community Post</h2>
                <p className="text-xs text-gray-400">Share a ride, swap a ticket, or organize a pre-party meetup.</p>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Post Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Ride share from Warsaw to Poznań"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                    >
                      <option value="General">General</option>
                      <option value="Ride Share">Ride Share</option>
                      <option value="Ticket Swap">Ticket Swap</option>
                      <option value="Meetup">Meetup</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">City</label>
                    <input
                      type="text"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Related Event (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Afterlife Poland"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Post Content</label>
                  <textarea
                    placeholder="Describe your ride share details, ticket swap terms, or meetup location..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    required
                    rows={4}
                    className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 rounded-full border border-white/10 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-purple-600 py-3 text-sm font-bold text-white hover:bg-purple-500 transition-all"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Community;