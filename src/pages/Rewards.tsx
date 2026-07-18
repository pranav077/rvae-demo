import React, { useState } from "react";
import { Sparkles, Gift, Ticket, Beer, Shirt, CheckCircle, ArrowRight, Lock, QrCode } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { showSuccess, showError } from "@/utils/toast";

interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: "tickets" | "drinks" | "merch";
  image: string;
  stock: number;
}

const REWARDS_DATA: RewardItem[] = [
  {
    id: "rew-1",
    title: "Jasna 1 Free Drink Voucher",
    description: "Redeemable for any single beer or cocktail at the main bar in Jasna 1, Warsaw.",
    cost: 100,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    stock: 45
  },
  {
    id: "rew-2",
    title: "Rave Nation Holographic Sticker Pack",
    description: "A pack of 5 high-quality, weather-resistant holographic stickers to customize your gear.",
    cost: 50,
    category: "merch",
    image: "https://images.unsplash.com/photo-1572945281869-882362fbcc10?auto=format&fit=crop&w=600&q=80",
    stock: 120
  },
  {
    id: "rew-3",
    title: "Prozak 2.0 VIP Balcony Upgrade",
    description: "Upgrade your standard ticket to VIP for any Friday night event at Prozak 2.0, Kraków.",
    cost: 200,
    category: "tickets",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    stock: 15
  },
  {
    id: "rew-4",
    title: "Rave Nation Limited Edition Tee",
    description: "Heavyweight black cotton t-shirt featuring our signature cyber-rave glow print.",
    cost: 400,
    category: "merch",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    stock: 8
  },
  {
    id: "rew-5",
    title: "Audioriver 2025 Friday Pass",
    description: "Full access pass for the opening Friday of Poland's premier electronic music festival.",
    cost: 1000,
    category: "tickets",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    stock: 3
  }
];

const Rewards = () => {
  const [userPoints, setUserPoints] = useState(450);
  const [activeFilter, setActiveFilter] = useState<"all" | "tickets" | "drinks" | "merch">("all");
  const [redeemedVoucher, setRedeemedVoucher] = useState<{ code: string; title: string } | null>(null);

  const filteredRewards = REWARDS_DATA.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  const handleRedeem = (item: RewardItem) => {
    if (userPoints < item.cost) {
      showError("Insufficient Rave Points!");
      return;
    }

    setUserPoints((prev) => prev - item.cost);
    const voucherCode = `RN-REW-${Math.floor(100000 + Math.random() * 900000)}`;
    setRedeemedVoucher({ code: voucherCode, title: item.title });
    showSuccess(`Successfully redeemed ${item.title}!`);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Points Balance */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
              Rave <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Rewards</span>
            </h1>
            <p className="text-sm text-gray-400">Redeem your loyalty points for exclusive merchandise, tickets, and club perks.</p>
          </div>

          {/* Points Card */}
          <div className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 flex items-center space-x-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-purple-500/20 blur-2xl" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-400">Your Balance</span>
              <span className="text-3xl font-black text-white">{userPoints} <span className="text-sm font-bold text-purple-400">Points</span></span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {(["all", "tickets", "drinks", "merch"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === filter
                  ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {filter === "all" ? "All Rewards" : filter}
            </button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRewards.map((item) => {
            const isLocked = userPoints < item.cost;
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/30 p-3 transition-all ${
                  isLocked ? "opacity-75" : "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                }`}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-purple-400 border border-white/10 uppercase tracking-wider flex items-center">
                      {item.category === "tickets" && <Ticket className="mr-1 h-3 w-3" />}
                      {item.category === "drinks" && <Beer className="mr-1 h-3 w-3" />}
                      {item.category === "merch" && <Shirt className="mr-1 h-3 w-3" />}
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/10">
                    {item.cost} Points
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Stock: {item.stock} left</span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={isLocked}
                    className={`w-full rounded-full py-3 text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                      isLocked
                        ? "bg-zinc-800 text-gray-500 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="h-3.5 w-3.5" />
                        <span>Locked (Need {item.cost - userPoints} more)</span>
                      </>
                    ) : (
                      <>
                        <Gift className="h-3.5 w-3.5" />
                        <span>Redeem Reward</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Voucher Modal / Confirmation */}
        {redeemedVoucher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6 text-center space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
              <div className="space-y-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-white">Reward Claimed!</h2>
                <p className="text-xs text-gray-400">Show this voucher code or QR code at the venue to claim your reward.</p>
              </div>

              {/* Digital Voucher */}
              <div className="rounded-2xl border border-white/5 bg-black p-5 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Rave Nation Reward</span>
                  <h3 className="text-sm font-bold text-white">{redeemedVoucher.title}</h3>
                </div>
                <div className="flex justify-center">
                  <QrCode className="h-32 w-32 text-white" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Voucher Code</span>
                  <p className="text-sm font-mono font-bold text-white tracking-wider">{redeemedVoucher.code}</p>
                </div>
              </div>

              <button
                onClick={() => setRedeemedVoucher(null)}
                className="w-full rounded-full bg-purple-600 py-3 text-xs font-bold text-white hover:bg-purple-500 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Rewards;