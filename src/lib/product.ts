export type PackSize = {
  id: string;
  label: string;
  volume: string;
  price: number;
  mrp: number;
  inStock: boolean;
  badge?: string;
};

export type Ingredient = {
  name: string;
  marathi: string;
  percent: number;
  icon: string;
  role: string;
};

export type DosageRow = {
  method: string;
  marathi: string;
  amount: string;
  when: string;
};

export type Product = {
  slug: string;
  name: string;
  brandName: string;
  category: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  benefits: { title: string; marathi: string; description: string; icon: string }[];
  dosage: DosageRow[];
  crops: string[];
  ingredients: Ingredient[];
  certifications: string[];
  packSizes: PackSize[];
  images: { src: string; alt: string }[];
  video: string;
  rating: number;
  reviewCount: number;
};

export const panchratna: Product = {
  slug: "panchratna",
  name: "Pancharatna",
  brandName: "Rise Pancharatna",
  category: "Broad Spectrum Growth Promoter",
  tagline: "Stronger roots. Bigger harvests. Pure organic power in every drop.",
  shortDescription:
    "A 100% organic liquid growth promoter crafted from seaweed, amino acids, humic & fulvic acids, vitamins, and natural auxins — scientifically formulated to boost every stage of your crop.",
  longDescription:
    "Rise Pancharatna is Green Raise Agro's flagship liquid bio-stimulant — a potent blend of six natural ingredients that awaken the full potential of your crop. From stronger root development to richer flowering, heavier fruits, and that healthy dark green colour farmers recognize as a winning crop. Safe for every crop, safe for the soil, safe for your family.",
  benefits: [
    {
      title: "Stronger Roots",
      marathi: "मुळांची वाढ होते",
      description: "Humic acid and auxins drive deep, dense root systems that pull more nutrients and water from the soil.",
      icon: "🌱",
    },
    {
      title: "Higher Yield",
      marathi: "उत्पादनात वाढ होते",
      description: "Farmers report 20–30% more yield, with healthier plants that resist weather stress and disease.",
      icon: "📈",
    },
    {
      title: "Better Flowering & Fruit Set",
      marathi: "फूल व फलधारणा वाढते",
      description: "Natural cytokinins and auxins improve flowering and prevent flower drop during critical stages.",
      icon: "🌸",
    },
    {
      title: "Bigger, Better Fruits",
      marathi: "फळांचा आकार आणि दर्जा वाढतो",
      description: "Uniform fruit size, better sugar content, longer shelf life — the qualities mandis pay more for.",
      icon: "🍎",
    },
    {
      title: "Deeper Green Leaves",
      marathi: "पिकांवर काळोखी येते",
      description: "That rich, dark-green 'kalokhi' colour every farmer wants — a visual sign of a thriving plant.",
      icon: "🍃",
    },
  ],
  dosage: [
    {
      method: "Soil Drenching",
      marathi: "आळवणीसाठी",
      amount: "1–2 litres per acre",
      when: "Mix with irrigation water every 20–25 days",
    },
    {
      method: "Foliar Spray",
      marathi: "फवारणीसाठी",
      amount: "2–3 ml per litre of water",
      when: "Spray in early morning or late evening every 15 days",
    },
  ],
  crops: [
    "Onion (कांदा)",
    "Ginger (आले)",
    "Tomato",
    "Grapes",
    "Pomegranate",
    "Sugarcane",
    "Cotton",
    "Wheat",
    "Paddy",
    "Soybean",
    "Chilli",
    "Banana",
    "Flowers",
    "Vegetables",
  ],
  ingredients: [
    {
      name: "Seaweed Extract",
      marathi: "सी-वीड",
      percent: 12,
      icon: "🌊",
      role: "Packed with natural growth hormones, vitamins, and over 60 trace minerals that kickstart plant growth.",
    },
    {
      name: "Humic Acid",
      marathi: "ह्युमिक ॲसिड",
      percent: 7,
      icon: "🪨",
      role: "Unlocks nutrients bound in the soil and builds healthy root structure.",
    },
    {
      name: "Auxins",
      marathi: "ऑक्सिन्स",
      percent: 6,
      icon: "⚡",
      role: "Natural plant hormones that trigger cell elongation and stronger, longer roots.",
    },
    {
      name: "Amino Acids",
      marathi: "अमिनो ॲसिड",
      percent: 5,
      icon: "🧬",
      role: "The building blocks of protein — fuel for faster plant growth and stress recovery.",
    },
    {
      name: "Fulvic Acid",
      marathi: "फुलविक ॲसिड",
      percent: 5,
      icon: "💧",
      role: "Boosts nutrient absorption through leaves and roots, so less is wasted.",
    },
    {
      name: "Vitamins",
      marathi: "व्हिटामिन",
      percent: 3,
      icon: "✨",
      role: "Supports photosynthesis, enzyme function, and overall plant immunity.",
    },
  ],
  certifications: ["FCO Compliant", "ISO Certified", "100% Organic"],
  packSizes: [
    {
      id: "1l",
      label: "1 Litre — Small farm / kitchen garden",
      volume: "1 L",
      price: 1000,
      mrp: 1299,
      inStock: true,
    },
    {
      id: "5l",
      label: "5 Litre — Ideal for 2–3 acres",
      volume: "5 L",
      price: 3500,
      mrp: 4499,
      inStock: true,
      badge: "Most Popular",
    },
    {
      id: "10l",
      label: "10 Litre — Bulk farmer pack",
      volume: "10 L",
      price: 6000,
      mrp: 7499,
      inStock: true,
      badge: "Best Value",
    },
  ],
  images: [
    { src: "/media/products/main.png", alt: "Rise Pancharatna 5-litre can — Broad Spectrum Growth Promoter" },
    { src: "/media/products/panchratna-01.jpg", alt: "Pancharatna in use on a thriving farm" },
    { src: "/media/products/panchratna-02.jpg", alt: "Pancharatna benefits — roots, yield, flowering" },
    { src: "/media/products/panchratna-03.jpg", alt: "Pancharatna composition — seaweed, amino, humic, fulvic, vitamins, auxins" },
    { src: "/media/products/panchratna-04.jpg", alt: "Pancharatna dosage — drenching and spraying" },
    { src: "/media/products/can.jpg", alt: "Pancharatna can close-up" },
  ],
  video: "/media/products/can-video.mp4",
  rating: 4.8,
  reviewCount: 1247,
};

export const videoTestimonials = [
  {
    farmer: "Ayush Sangle",
    location: "Sinnar, Maharashtra",
    crop: "Onion (कांदा)",
    video: "/media/testimonials/ayush-sangle-sinnar-kanda.mp4",
    quote: "Pancharatna gave me bigger onions with stronger skin — mandi paid me extra.",
  },
  {
    farmer: "Ganesh Pawar",
    location: "Maharashtra",
    crop: "Ginger (आले)",
    video: "/media/testimonials/ganesh-pawar-ginger.mp4",
    quote: "My ginger rhizomes are fatter and the plants are a deep green.",
  },
  {
    farmer: "Shivana Gupta",
    location: "Maharashtra",
    crop: "Multi-crop",
    video: "/media/testimonials/shivana-gupta.mov",
    quote: "Works on every crop I grow. I recommend Pancharatna to all my neighbours.",
  },
];
