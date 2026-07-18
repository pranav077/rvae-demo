import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Music, MapPin, Calendar, Flame, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EVENTS, VENUES, GENRES } from "@/data/mockData";
import { showSuccess } from "@/utils/toast";

interface Question {
  id: number;
  text: string;
  category: "bpm" | "vibe" | "preparty";
  options: {
    text: string;
    desc: string;
    value: string;
    icon: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What speed and energy level gets you moving?",
    category: "bpm",
    options: [
      { text: "Chill & Groovy", desc: "120 - 125 BPM. Deep house, minimal, and warm basslines.", value: "House", icon: "🌊" },
      { text: "Hypnotic & Melodic", desc: "124 - 128 BPM. Ethereal synths, emotional builds, and cinematic journeys.", value: "Melodic Techno", icon: "✨" },
      { text: "Fast & Relentless", desc: "140+ BPM. Pounding industrial kicks, acid lines, and high-tempo energy.", value: "Hard Techno", icon: "⚡" },
      { text: "Psychedelic & Trippy", desc: "138 - 145 BPM. Mind-bending soundscapes, rolling bass, and tribal rhythms.", value: "Psytrance", icon: "🌀" }
    ]
  },
  {
    id: 2,
    text: "What is your ideal dancefloor environment?",
    category: "vibe",
    options: [
      { text: "Intimate Basement", desc: "Dark, sweaty, low ceilings, and a strict no-photo policy.", value: "Jasna 1", icon: "🕳️" },
      { text: "Massive Concert Hall", desc: "Huge stage, production-grade lasers, and thousands of ravers.", value: "Tama", icon: "🏛️" },
      { text: "Industrial Warehouse", desc: "Raw concrete, heavy sound systems, and immersive strobe lights.", value: "Ciało", icon: "🏭" },
      { text: "Historic Medieval Cellar", desc: "Atmospheric brick arches, multiple levels, and cozy corners.", value: "Prozak 2.0", icon: "🏰" }
    ]
  },
  {
    id: 3,
    text: "How do you prefer to start your night?",
    category: "preparty",
    options: [
      { text: "Rooftop Cocktails", desc: "Watching the sunset over the city skyline with a premium drink.", value: "Kraków", icon: "🍹" },
      { text: "Riverside / Open-air Hangout", desc: "Chilling by the water with friends under neon lights.", value: "Warsaw", icon: "🍻" },
      { text: "Cozy Craft Beer Square", desc: "Relaxed vibes in a historic market square.", value: "Wrocław", icon: "🍺" },
      { text: "Straight to the Club Queue", desc: "No pre-party needed, ready to dance from the first beat.", value: "Poznań", icon: "🎟️" }
    ]
  }
];

const RaveFinder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (category: string, value: string) => {
    const updatedAnswers = { ...answers, [category]: value };
    setAnswers(updatedAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
      showSuccess("Your rave profile is ready!");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  // Match logic based on answers
  const getRecommendedGenre = () => answers.bpm || "Techno";
  
  const getRecommendedVenue = () => {
    const venueName = answers.vibe || "Jasna 1";
    return VENUES.find(v => v.name === venueName) || VENUES[0];
  };

  const getRecommendedEvent = () => {
    const genre = getRecommendedGenre();
    const matchedEvent = EVENTS.find(e => e.genres.includes(genre));
    return matchedEvent || EVENTS[0];
  };

  const recommendedGenre = getRecommendedGenre();
  const recommendedVenue = getRecommendedVenue();
  const recommendedEvent = getRecommendedEvent();

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        
        {!showResult ? (
          /* Quiz Steps */
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                <span>Rave Finder Quiz</span>
                <span>Step {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 sm:p-10 space-y-8 shadow-[0_0_30px_rgba(168,85,247,0.05)]">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center">
                  <Sparkles className="mr-1.5 h-4 w-4" /> Matchmaker
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {QUIZ_QUESTIONS[currentStep].text}
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-4">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(QUIZ_QUESTIONS[currentStep].category, opt.value)}
                    className="group flex items-start space-x-4 rounded-2xl border border-white/10 bg-black/40 p-5 text-left transition-all hover:border-purple-500/50 hover:bg-purple-500/5"
                  >
                    <span className="text-2xl p-2 bg-zinc-900 rounded-xl group-hover:scale-110 transition-transform">
                      {opt.icon}
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                        {opt.text}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Back Button */}
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to previous question</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results */
          <div className="space-y-10 max-w-3xl mx-auto animate-in fade-in duration-500">
            <div className="text-center space-y-3">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                <Sparkles className="h-8 w-8 animate-pulse" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-white">
                Your Rave <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Match</span>
              </h1>
              <p className="text-sm text-gray-400">Based on your answers, here is your perfect electronic music profile.</p>
            </div>

            {/* Result Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Genre & Vibe Profile */}
              <div className="rounded-3xl border border-white/10 bg-zinc-900/30 p-6 sm:p-8 space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 flex items-center">
                  <Music className="mr-2 h-4 w-4" /> Your Sound Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Primary Genre</span>
                    <p className="text-2xl font-black text-white">{recommendedGenre}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Ideal Venue Vibe</span>
                    <p className="text-lg font-bold text-white">{recommendedVenue.name}</p>
                    <p className="text-xs text-gray-400">{recommendedVenue.city} • {recommendedVenue.dressCode}</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <button
                    onClick={() => navigate(`/venues?id=${recommendedVenue.id}`)}
                    className="text-xs font-bold text-purple-400 hover:underline flex items-center"
                  >
                    Explore Venue Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Recommended Event Card */}
              <div className="rounded-3xl border border-purple-500/30 bg-purple-500/5 p-6 sm:p-8 space-y-6 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-pink-400 flex items-center">
                  <Flame className="mr-2 h-4 w-4 animate-pulse" /> Recommended Event
                </h3>
                <div className="flex items-start space-x-4">
                  <img src={recommendedEvent.image} alt={recommendedEvent.title} className="h-20 w-20 rounded-2xl object-cover border border-white/10" />
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-bold text-white truncate">{recommendedEvent.title}</h4>
                    <p className="text-xs text-gray-400 flex items-center"><Calendar className="mr-1 h-3 w-3" /> {recommendedEvent.date}</p>
                    <p className="text-xs text-gray-400 flex items-center"><MapPin className="mr-1 h-3 w-3" /> {recommendedEvent.city}</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-6 flex items-center justify-between">
                  <Link
                    to={`/event/${recommendedEvent.slug}`}
                    className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white hover:scale-105 transition-all"
                  >
                    Get Tickets
                  </Link>
                  <button
                    onClick={resetQuiz}
                    className="text-xs font-bold text-gray-400 hover:text-white flex items-center space-x-1"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default RaveFinder;