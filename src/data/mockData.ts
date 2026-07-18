export interface Artist {
  id: string;
  name: string;
  genre: string[];
  country: string;
  bio: string;
  image: string;
  spotifyUrl: string;
  soundcloudUrl: string;
  instagramUrl: string;
  followers: number;
  achievements: string[];
  discography: { title: string; year: string; type: string }[];
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  address: string;
  capacity: number;
  soundSystem: string;
  lightingSystem: string;
  description: string;
  image: string;
  rating: number;
  facilities: string[];
  dressCode: string;
  openingHours: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  time: string;
  venueId: string;
  city: string;
  genres: string[];
  price: number;
  isFree: boolean;
  isSoldOut: boolean;
  isFeatured: boolean;
  image: string;
  description: string;
  lineup: string[]; // Artist IDs
  organizer: string;
  rules: string[];
  prohibitedItems: string[];
  parking: string;
  transportation: string;
  hotels: { name: string; distance: string; price: string }[];
  faqs: { q: string; a: string }[];
  attendeesCount: number;
  rating: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  likes: number;
}

export const CITIES = [
  "Warsaw", "Kraków", "Wrocław", "Poznań", "Gdańsk", "Łódź", "Katowice", "Szczecin", "Lublin"
];

export const GENRES = [
  "Techno", "Hard Techno", "Melodic Techno", "Psytrance", "Acid Techno", "House", "Minimal", "Drum and Bass", "Trance", "Industrial Techno"
];

export const ARTISTS: Artist[] = [
  {
    id: "art-1",
    name: "VTSS",
    genre: ["Hard Techno", "Industrial Techno", "Acid Techno"],
    country: "Poland",
    bio: "VTSS is one of the most vital figures in the contemporary techno scene. Born in Warsaw and now based in Berlin, she has taken the world by storm with her high-energy, genre-bending DJ sets and productions.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com",
    soundcloudUrl: "https://soundcloud.com",
    instagramUrl: "https://instagram.com",
    followers: 142000,
    achievements: ["Mixmag Cover Artist", "Resident Advisor Top Tracks of the Year", "Boiler Room Legend"],
    discography: [
      { title: "Proshka EP", year: "2022", type: "EP" },
      { title: "Borderline Trend", year: "2021", type: "Single" },
      { title: "Self Control", year: "2020", type: "EP" }
    ]
  },
  {
    id: "art-2",
    name: "Catz 'n Dogz",
    genre: ["House", "Minimal", "Tech House"],
    country: "Poland",
    bio: "The Polish duo of Wojciech Tarańczuk and Grzegorz Demiańczuk have been making waves globally for over a decade, bringing their infectious house grooves and quirky productions to the world's best clubs.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com",
    soundcloudUrl: "https://soundcloud.com",
    instagramUrl: "https://instagram.com",
    followers: 98000,
    achievements: ["DJ Mag Best Duo Nominee", "Pets Recordings Label Bosses"],
    discography: [
      { title: "Moments", year: "2021", type: "Album" },
      { title: "Friendship", year: "2019", type: "Album" }
    ]
  },
  {
    id: "art-3",
    name: "KAS:ST",
    genre: ["Melodic Techno", "Techno"],
    country: "France",
    bio: "KAS:ST is a French duo known for their cinematic, emotional, and powerful melodic techno. Their immersive soundscapes have captured the hearts of electronic music lovers worldwide.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com",
    soundcloudUrl: "https://soundcloud.com",
    instagramUrl: "https://instagram.com",
    followers: 210000,
    achievements: ["Afterlife Records Regulars", "Sold out Printworks London"],
    discography: [
      { title: "A Magic World", year: "2020", type: "Album" },
      { title: "Hold Me To The Light", year: "2019", type: "EP" }
    ]
  },
  {
    id: "art-4",
    name: "Sept",
    genre: ["Techno", "Industrial Techno"],
    country: "Poland",
    bio: "Sept is a key figure in the Polish underground techno scene. As a DJ, producer, and label owner of Voxnox, his hypnotic and driving sound has resonated across Europe's best dancefloors.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    spotifyUrl: "https://open.spotify.com",
    soundcloudUrl: "https://soundcloud.com",
    instagramUrl: "https://instagram.com",
    followers: 35000,
    achievements: ["Tresor Berlin Resident", "Voxnox Records Founder"],
    discography: [
      { title: "Direction EP", year: "2023", type: "EP" },
      { title: "Chaos Theory", year: "2021", type: "Single" }
    ]
  }
];

export const VENUES: Venue[] = [
  {
    id: "ven-1",
    name: "Jasna 1",
    city: "Warsaw",
    address: "Jasna 1, 00-013 Warszawa",
    capacity: 600,
    soundSystem: "Function-One Resolution Series",
    lightingSystem: "Custom minimalist LED installations & strobe arrays",
    description: "Jasna 1 is the beating heart of Warsaw's underground club scene. Known for its strict no-photo policy, inclusive atmosphere, and world-class curation focusing on house, techno, and electro.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    facilities: ["Two Dancefloors", "Chillout Zone", "Cocktail Bar", "Cloakroom", "Smoking Area"],
    dressCode: "All black / Expressive / Underground",
    openingHours: "Friday - Saturday: 23:00 - 07:00"
  },
  {
    id: "ven-2",
    name: "Prozak 2.0",
    city: "Kraków",
    address: "Plac Dominikański 6, 31-043 Kraków",
    capacity: 800,
    soundSystem: "Void Acoustics Tri-Motion",
    lightingSystem: "Interactive 3D LED ceiling and laser mapping",
    description: "Located in a historic medieval basement in Kraków, Prozak 2.0 offers a unique underground atmosphere combined with state-of-the-art sound and visual technology.",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    facilities: ["Three Levels", "VIP Lounge", "Multiple Bars", "Interactive Art Installations"],
    dressCode: "Smart Casual / Clubwear",
    openingHours: "Wednesday - Saturday: 22:30 - 06:00"
  },
  {
    id: "ven-3",
    name: "Ciało",
    city: "Wrocław",
    address: "Joannitów 13, 50-525 Wrocław",
    capacity: 500,
    soundSystem: "Lambda Labs QX Series",
    lightingSystem: "Immersive dark ambient lighting with kinetic lasers",
    description: "Ciało is Wrocław's premier destination for raw, industrial, and hypnotic techno. A safe space dedicated to pure dancefloor expression and high-fidelity sound.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    facilities: ["Main Room", "Ambient Room", "Outdoor Courtyard", "Safe Space Team"],
    dressCode: "Underground / Techno-focused",
    openingHours: "Friday - Saturday: 23:00 - 08:00"
  },
  {
    id: "ven-4",
    name: "Tama",
    city: "Poznań",
    address: "Niezłomnych 2, 61-894 Poznań",
    capacity: 1500,
    soundSystem: "L-Acoustics K2",
    lightingSystem: "Grand concert-scale moving head arrays and visual projection mapping",
    description: "Housed in a stunning, historic ballroom, Tama is a massive concert and club venue that hosts the biggest names in international electronic music, from melodic techno to drum & bass.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    facilities: ["Massive Dancefloor", "Balcony VIP Area", "Huge Stage", "Production Grade Visuals"],
    dressCode: "Casual / Festival Style",
    openingHours: "Event-based: 22:00 - 06:00"
  }
];

export const EVENTS: Event[] = [
  {
    id: "evt-1",
    title: "Rave Nation: Warsaw Industrial Gathering",
    slug: "rave-nation-warsaw-industrial-gathering",
    date: "2025-06-14",
    time: "23:00 - 08:00",
    venueId: "ven-1",
    city: "Warsaw",
    genres: ["Hard Techno", "Industrial Techno", "Acid Techno"],
    price: 80,
    isFree: false,
    isSoldOut: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    description: "Prepare for the ultimate industrial gathering in the heart of Poland. Rave Nation brings together the heaviest hitters of the hard techno scene for a night of relentless, high-tempo energy, pounding basslines, and immersive visual production.",
    lineup: ["art-1", "art-4"],
    organizer: "Rave Nation Poland",
    rules: [
      "Strict no-photo/no-video policy on the dancefloor.",
      "Zero tolerance for harassment, discrimination, or hate speech.",
      "18+ only. Valid ID required at the door."
    ],
    prohibitedItems: ["Professional cameras", "Weapons or sharp objects", "Outside food and beverages", "Illegal substances"],
    parking: "Limited street parking available. We highly recommend using public transport or taxi services.",
    transportation: "Metro Station: Świętokrzyska (5 min walk). Tram lines: 4, 15, 18, 35.",
    hotels: [
      { name: "Hotel Warszawa", distance: "0.3 km", price: "PLN 650/night" },
      { name: "Motel One Warsaw-Chopin", distance: "0.8 km", price: "PLN 320/night" }
    ],
    faqs: [
      { q: "Is there a cloakroom?", a: "Yes, a secure cloakroom is available for PLN 10 per item." },
      { q: "Can I buy tickets at the door?", a: "Yes, unless the event sells out online beforehand. Door tickets will be PLN 100." }
    ],
    attendeesCount: 450,
    rating: 4.9
  },
  {
    id: "evt-2",
    title: "Afterlife Poland: Melodic Odyssey",
    slug: "afterlife-poland-melodic-odyssey",
    date: "2025-06-21",
    time: "22:00 - 06:00",
    venueId: "ven-4",
    city: "Poznań",
    genres: ["Melodic Techno", "Techno"],
    price: 150,
    isFree: false,
    isSoldOut: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    description: "An immersive journey through sound and consciousness. Experience the signature ethereal melodies, dramatic breakdowns, and state-of-the-art visual projections that define the global Afterlife phenomenon.",
    lineup: ["art-3"],
    organizer: "Tama Events & Afterlife",
    rules: [
      "Respect the venue and other attendees.",
      "No flash photography.",
      "18+ only. Valid ID required."
    ],
    prohibitedItems: ["Large backpacks", "Laser pointers", "Selfie sticks", "Outside drinks"],
    parking: "On-site secure parking available for PLN 40.",
    transportation: "Tram lines: 2, 5, 9, 13 (Niezłomnych stop).",
    hotels: [
      { name: "Sheraton Poznan Hotel", distance: "1.2 km", price: "PLN 450/night" },
      { name: "B&B Hotel Poznań Old Town", distance: "0.5 km", price: "PLN 220/night" }
    ],
    faqs: [
      { q: "Will there be food options?", a: "Yes, food trucks will be available in the outdoor courtyard throughout the night." }
    ],
    attendeesCount: 1500,
    rating: 4.8
  },
  {
    id: "evt-3",
    title: "Summer Solstice Psytrance Gathering",
    slug: "summer-solstice-psytrance-gathering",
    date: "2025-06-28",
    time: "18:00 - 10:00",
    venueId: "ven-3",
    city: "Wrocław",
    genres: ["Psytrance", "Dark Psy", "Full-on"],
    price: 60,
    isFree: false,
    isSoldOut: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    description: "Celebrate the summer solstice with a 16-hour psychedelic marathon. Featuring custom UV decorations, mind-bending visual mapping, and a lineup of Poland's finest psytrance selectors.",
    lineup: ["art-4"],
    organizer: "Psychedelic Poland Collective",
    rules: [
      "Leave no trace - respect the environment.",
      "Positive vibes only.",
      "18+ only."
    ],
    prohibitedItems: ["Glass bottles", "Weapons", "Illegal substances"],
    parking: "Free parking available near the venue.",
    transportation: "Bus lines: 110, 122, 145 (Joannitów stop).",
    hotels: [
      { name: "Novotel Wrocław Centrum", distance: "0.7 km", price: "PLN 280/night" }
    ],
    faqs: [
      { q: "Is there a camping area?", a: "Yes, a designated chill/camping area is available for resting." }
    ],
    attendeesCount: 320,
    rating: 4.7
  },
  {
    id: "evt-4",
    title: "House Nation: Rooftop Grooves",
    slug: "house-nation-rooftop-grooves",
    date: "2025-07-05",
    time: "16:00 - 23:00",
    venueId: "ven-2",
    city: "Kraków",
    genres: ["House", "Minimal", "Tech House"],
    price: 0,
    isFree: true,
    isSoldOut: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=1200&q=80",
    description: "Enjoy the sunset over Kraków's historic skyline with the finest house music selectors. Free entry with RSVP, premium cocktails, and pure summer vibes.",
    lineup: ["art-2"],
    organizer: "Prozak 2.0 & Pets Recordings",
    rules: [
      "RSVP does not guarantee entry if venue capacity is reached. Arrive early!",
      "Smart casual dress code.",
      "18+ only."
    ],
    prohibitedItems: ["Outside food or drinks", "Professional recording equipment"],
    parking: "Public underground parking at Plac Na Groblach (10 min walk).",
    transportation: "All trams to Poczta Główna or Filharmonia.",
    hotels: [
      { name: "Radisson Blu Hotel Kraków", distance: "0.4 km", price: "PLN 500/night" }
    ],
    faqs: [
      { q: "How do I RSVP?", a: "Simply click the 'RSVP' button on this page to secure your free ticket." }
    ],
    attendeesCount: 600,
    rating: 4.6
  }
];

export const NEWS: NewsArticle[] = [
  {
    id: "news-1",
    title: "VTSS Announces Massive Poland Tour for Autumn 2025",
    category: "Artist News",
    tags: ["VTSS", "Tour", "Techno", "Poland"],
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    content: "Poland's techno queen VTSS has officially announced her highly anticipated homecoming tour. Spanning across five major cities including Warsaw, Kraków, Wrocław, Poznań, and Gdańsk, the tour promises to bring her signature high-tempo, genre-defying sound back to her roots. Expect custom stage designs, local support from rising Polish talents, and extended sets that will push the boundaries of the underground club experience.",
    author: "Jan Kowalski",
    date: "2025-05-10",
    readTime: "3 min read",
    likes: 342
  },
  {
    id: "news-2",
    title: "The Rise of Hard Techno in Poland: A Cultural Shift",
    category: "Editorial",
    tags: ["Hard Techno", "Culture", "Warsaw", "Clubs"],
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80",
    content: "Over the past three years, Poland has witnessed an unprecedented surge in the popularity of hard techno. What once was a niche subgenre confined to dark, industrial warehouses has now captured the mainstream youth culture. From the packed dancefloors of Jasna 1 and Ciało to massive festival stages, we dive deep into the roots of this movement, exploring how local promoters, DJs, and a passionate community have built one of the most vibrant hard techno scenes in Europe.",
    author: "Marta Wiśniewska",
    date: "2025-05-08",
    readTime: "6 min read",
    likes: 512
  },
  {
    id: "news-3",
    title: "Audioriver Festival 2025 Reveals Full Lineup and New Stage Concepts",
    category: "Festival News",
    tags: ["Audioriver", "Festival", "Lineup", "Płock"],
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    content: "Poland's premier electronic music festival, Audioriver, has unveiled its complete lineup for the 2025 edition. Alongside global heavyweights, the festival is introducing two brand new stage concepts focusing on immersive audio-visual experiences and ambient/experimental sounds. With a strong emphasis on sustainability and community, this year's edition is set to be the most ambitious in the festival's history.",
    author: "Piotr Nowak",
    date: "2025-05-05",
    readTime: "4 min read",
    likes: 289
  }
];

export const USER_PROFILE = {
  name: "Kamil Nowak",
  email: "kamil@ravenation.pl",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  role: "User", // User, Organizer, Admin
  loyaltyPoints: 450,
  badges: ["Early Bird", "Techno Disciple", "Local Supporter"],
  savedEvents: ["evt-1", "evt-3"],
  followedArtists: ["art-1", "art-3"],
  followedVenues: ["ven-1", "ven-3"],
  isPremium: false
};