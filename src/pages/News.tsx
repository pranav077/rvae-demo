import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, User, Clock, Heart, Share2, ArrowLeft } from "lucide-react";
import { NEWS } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { showSuccess } from "@/utils/toast";

const News = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  
  const [selectedArticle, setSelectedArticle] = useState<typeof NEWS[0] | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    if (articleId) {
      const article = NEWS.find((n) => n.id === articleId);
      if (article) {
        setSelectedArticle(article);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [articleId]);

  const handleArticleSelect = (article: typeof NEWS[0] | null) => {
    setSelectedArticle(article);
    if (article) {
      setSearchParams({ id: article.id });
    } else {
      setSearchParams({});
    }
  };

  const handleLike = (id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    showSuccess("Article liked!");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {selectedArticle ? (
          /* Detailed Article View */
          <div className="space-y-8 max-w-3xl mx-auto">
            <button
              onClick={() => handleArticleSelect(null)}
              className="flex items-center space-x-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to News</span>
            </button>

            <div className="space-y-4">
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-400 border border-purple-500/30 uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                {selectedArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-b border-white/10 pb-4">
                <span className="flex items-center"><User className="mr-1 h-3.5 w-3.5 text-purple-400" /> {selectedArticle.author}</span>
                <span className="flex items-center"><Calendar className="mr-1 h-3.5 w-3.5 text-cyan-400" /> {selectedArticle.date}</span>
                <span className="flex items-center"><Clock className="mr-1 h-3.5 w-3.5 text-pink-400" /> {selectedArticle.readTime}</span>
              </div>
            </div>

            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-96 object-cover rounded-3xl border border-white/10" />

            <div className="text-gray-300 leading-relaxed space-y-6 text-base">
              <p>{selectedArticle.content}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>

            {/* Tags & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="flex flex-wrap gap-1.5">
                {selectedArticle.tags.map((tag, i) => (
                  <span key={i} className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-gray-400 border border-white/5">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(selectedArticle.id)}
                  className="flex items-center space-x-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-gray-300 hover:text-white transition-all"
                >
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span>{selectedArticle.likes + (likes[selectedArticle.id] || 0)}</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showSuccess("Article link copied!");
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Article List View */
          <div className="space-y-10">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
                News & <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Editorial</span>
              </h1>
              <p className="text-sm text-gray-400">Stay updated with the latest festival announcements, artist interviews, and music reviews.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {NEWS.map((art) => (
                <div
                  key={art.id}
                  onClick={() => handleArticleSelect(art)}
                  className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/20 transition-all hover:border-purple-500/30"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-400 border border-purple-500/30 uppercase tracking-wider">
                        {art.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3">{art.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default News;