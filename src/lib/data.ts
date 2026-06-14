import type {
  Artwork,
  Collection,
  CommissionRequest,
  Customer,
  JournalPost,
  Order,
  ProcessStep,
  Testimonial,
  TimelineEvent,
} from "./types";

/** Build a tuned Unsplash URL. */
const u = (id: string, w = 1200, h = 1500) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const BRAND = {
  name: "Naïa",
  full: "Naïa Lemaire",
  signature: "Naïart",
  tagline: "Where Emotion Meets Canvas",
  role: "Contemporary Painter · Studio Arles",
  email: "studio@naiart.com",
  phone: "+33 4 90 00 00 00",
  address: "Atelier Naïa — 14 Rue des Arts, Arles, Provence, France",
  social: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    behance: "https://behance.net",
    youtube: "https://youtube.com",
  },
};

export const collections: Collection[] = [
  {
    slug: "abstract",
    name: "Abstract",
    tagline: "Emotion without form",
    description:
      "Gestural fields of pigment where feeling precedes recognition — works that breathe, dissolve, and resolve before the eye.",
    cover: u("1549887534-1541e9326642", 1400, 1750),
  },
  {
    slug: "modern",
    name: "Modern",
    tagline: "The contemporary line",
    description:
      "Bold compositions in dialogue with the present — graphic, confident, and unmistakably of this moment.",
    cover: u("1541961017774-22349e4a1262", 1400, 1750),
  },
  {
    slug: "landscape",
    name: "Landscape",
    tagline: "Light across the earth",
    description:
      "Provençal horizons rendered in shifting light — the slow drama of sky, field, and sea distilled to atmosphere.",
    cover: u("1490750967868-88aa4486c946", 1400, 1750),
  },
  {
    slug: "portrait",
    name: "Portrait",
    tagline: "The interior gaze",
    description:
      "Studies of presence and absence — faces that hold a private weather of memory and longing.",
    cover: u("1578321272176-b7bbc0679853", 1400, 1750),
  },
  {
    slug: "custom",
    name: "Custom Artwork",
    tagline: "Painted for you",
    description:
      "A bespoke commission process — a singular work conceived in dialogue with your space, story, and light.",
    cover: u("1513519245088-0e12902e35ca", 1400, 1750),
  },
];

export const artworks: Artwork[] = [
  {
    id: "aw-01",
    slug: "the-quiet-hour",
    title: "The Quiet Hour",
    year: 2024,
    price: 8600,
    collection: "abstract",
    medium: "Oil & cold wax on linen",
    dimensions: "120 × 150 cm",
    description:
      "A meditation on the moment before dawn, when colour has not yet committed to form.",
    story:
      "Painted across forty mornings in the Arles studio, The Quiet Hour holds the breath between night and day. Layers of cold wax were polished and re-broken until the surface began to hold light like skin.",
    images: [
      u("1549887534-1541e9326642"),
      u("1536924940846-227afb31e2a5"),
      u("1515405295579-ba7b45403062"),
    ],
    dominantColor: "#B8924A",
    colorName: "Amber",
    availability: "available",
    stock: 1,
    featured: true,
    limited: true,
    newArrival: true,
    popularity: 98,
    createdAt: "2024-11-02",
    orientation: "landscape",
  },
  {
    id: "aw-02",
    slug: "ivory-silence",
    title: "Ivory Silence",
    year: 2024,
    price: 6400,
    collection: "abstract",
    medium: "Acrylic & marble dust on canvas",
    dimensions: "100 × 140 cm",
    description:
      "Near-white impasto carved with palette knife, a study of texture in absence of colour.",
    story:
      "Ground marble dust gives this work its tactile, architectural surface. From a distance it reads as pure ivory; up close, a topography of ridges catches every shift of light.",
    images: [u("1536924940846-227afb31e2a5"), u("1549887534-1541e9326642")],
    dominantColor: "#E7DECF",
    colorName: "Ivory",
    availability: "available",
    stock: 1,
    featured: true,
    limited: false,
    newArrival: true,
    popularity: 86,
    createdAt: "2024-10-18",
    orientation: "portrait",
  },
  {
    id: "aw-03",
    slug: "provence-noon",
    title: "Provence, Noon",
    year: 2023,
    price: 9800,
    collection: "landscape",
    medium: "Oil on linen",
    dimensions: "130 × 160 cm",
    description:
      "The white heat of a southern midday pressed flat against the horizon.",
    story:
      "Field studies near the Camargue informed this large canvas. The challenge was to paint heat itself — the shimmer that erases the line between earth and air.",
    images: [u("1490750967868-88aa4486c946"), u("1500964757637-c85e8a162699")],
    dominantColor: "#D8B872",
    colorName: "Gold",
    availability: "available",
    stock: 1,
    featured: true,
    limited: true,
    newArrival: false,
    popularity: 94,
    createdAt: "2023-08-12",
    orientation: "landscape",
  },
  {
    id: "aw-04",
    slug: "she-who-waits",
    title: "She Who Waits",
    year: 2024,
    price: 11200,
    collection: "portrait",
    medium: "Oil on panel",
    dimensions: "90 × 120 cm",
    description: "A portrait dissolving at its edges into shadow and gold leaf.",
    story:
      "Gold leaf was laid beneath translucent glazes so the figure seems lit from within. The face is deliberately unresolved — presence as much as likeness.",
    images: [u("1578321272176-b7bbc0679853"), u("1531913764164-f85c52e6e654")],
    dominantColor: "#8B6F47",
    colorName: "Clay",
    availability: "reserved",
    stock: 1,
    featured: true,
    limited: true,
    newArrival: true,
    popularity: 91,
    createdAt: "2024-09-05",
    orientation: "portrait",
  },
  {
    id: "aw-05",
    slug: "tidal-memory",
    title: "Tidal Memory",
    year: 2023,
    price: 7200,
    collection: "abstract",
    medium: "Mixed media on canvas",
    dimensions: "110 × 110 cm",
    description: "Concentric washes that recede like the pull of the sea.",
    story:
      "Built from dozens of thin pours, each allowed to dry before the next, Tidal Memory is a record of patience — a tide line of the artist's own time.",
    images: [u("1515405295579-ba7b45403062"), u("1549887534-1541e9326642")],
    dominantColor: "#2A2723",
    colorName: "Graphite",
    availability: "available",
    stock: 1,
    featured: false,
    limited: false,
    newArrival: false,
    popularity: 78,
    createdAt: "2023-05-21",
    orientation: "square",
  },
  {
    id: "aw-06",
    slug: "the-modern-garden",
    title: "The Modern Garden",
    year: 2024,
    price: 8900,
    collection: "modern",
    medium: "Acrylic on canvas",
    dimensions: "140 × 140 cm",
    description: "Flattened botanicals in confident blocks of colour.",
    story:
      "A contemporary reading of the still life — flowers reduced to architecture, colour to emotion.",
    images: [u("1541961017774-22349e4a1262"), u("1502691876148-a84978e59af8")],
    dominantColor: "#B8924A",
    colorName: "Amber",
    availability: "available",
    stock: 1,
    featured: true,
    limited: false,
    newArrival: true,
    popularity: 83,
    createdAt: "2024-07-30",
    orientation: "square",
  },
  {
    id: "aw-07",
    slug: "horizon-study-vii",
    title: "Horizon Study VII",
    year: 2022,
    price: 5400,
    collection: "landscape",
    medium: "Oil on board",
    dimensions: "80 × 100 cm",
    description: "One of a series chasing the last minute of evening light.",
    story:
      "The seventh in a series of quick, decisive studies — painted alla prima in a single sitting as the sun went down.",
    images: [u("1500964757637-c85e8a162699"), u("1490750967868-88aa4486c946")],
    dominantColor: "#D8B872",
    colorName: "Gold",
    availability: "sold",
    stock: 0,
    featured: false,
    limited: false,
    newArrival: false,
    popularity: 72,
    createdAt: "2022-11-15",
    orientation: "landscape",
  },
  {
    id: "aw-08",
    slug: "interior-weather",
    title: "Interior Weather",
    year: 2024,
    price: 10400,
    collection: "portrait",
    medium: "Oil & charcoal on linen",
    dimensions: "100 × 130 cm",
    description: "A figure half-turned, caught between two states of feeling.",
    story:
      "Charcoal underdrawing remains visible through the oil, a deliberate exposure of the painting's own thinking.",
    images: [u("1531913764164-f85c52e6e654"), u("1578321272176-b7bbc0679853")],
    dominantColor: "#1A1815",
    colorName: "Charcoal",
    availability: "available",
    stock: 1,
    featured: false,
    limited: true,
    newArrival: true,
    popularity: 88,
    createdAt: "2024-06-11",
    orientation: "portrait",
  },
  {
    id: "aw-09",
    slug: "gold-fracture",
    title: "Gold Fracture",
    year: 2023,
    price: 12600,
    collection: "abstract",
    medium: "Oil, gold leaf & resin on panel",
    dimensions: "150 × 150 cm",
    description: "A field of deep umber split by a single seam of gold.",
    story:
      "Inspired by kintsugi, the seam of gold celebrates the break rather than hiding it — the wound as the most luminous part of the whole.",
    images: [u("1502691876148-a84978e59af8"), u("1541961017774-22349e4a1262")],
    dominantColor: "#B8924A",
    colorName: "Gold",
    availability: "available",
    stock: 1,
    featured: true,
    limited: true,
    newArrival: false,
    popularity: 96,
    createdAt: "2023-12-01",
    orientation: "square",
  },
  {
    id: "aw-10",
    slug: "first-light-camargue",
    title: "First Light, Camargue",
    year: 2024,
    price: 7800,
    collection: "landscape",
    medium: "Oil on linen",
    dimensions: "100 × 120 cm",
    description: "Salt marshes silvered by the earliest morning.",
    story:
      "The Camargue's wild horses move just beyond the frame; what remains is the silver hush of water meeting sky.",
    images: [u("1470770841072-f978cf4d019e"), u("1490750967868-88aa4486c946")],
    dominantColor: "#C9BBA0",
    colorName: "Sand",
    availability: "available",
    stock: 1,
    featured: false,
    limited: false,
    newArrival: true,
    popularity: 80,
    createdAt: "2024-04-22",
    orientation: "landscape",
  },
  {
    id: "aw-11",
    slug: "form-no-3",
    title: "Form No. 3",
    year: 2023,
    price: 6900,
    collection: "modern",
    medium: "Acrylic & ink on canvas",
    dimensions: "120 × 90 cm",
    description: "Architectural shapes balanced on the edge of collapse.",
    story:
      "Part of an ongoing series exploring equilibrium — the tension of forms that should not hold, but do.",
    images: [u("1505847119291-32d6f0a1f0a8"), u("1541961017774-22349e4a1262")],
    dominantColor: "#2A2723",
    colorName: "Graphite",
    availability: "available",
    stock: 1,
    featured: false,
    limited: false,
    newArrival: false,
    popularity: 69,
    createdAt: "2023-03-09",
    orientation: "portrait",
  },
  {
    id: "aw-12",
    slug: "the-long-summer",
    title: "The Long Summer",
    year: 2024,
    price: 13800,
    collection: "abstract",
    medium: "Oil & cold wax on linen",
    dimensions: "160 × 200 cm",
    description: "A monumental field of warm whites and faded rose.",
    story:
      "The largest work of the year — a canvas you do not look at so much as enter. Painted to hold the heat of an entire Provençal summer.",
    images: [u("1531913764164-f85c52e6e654"), u("1515405295579-ba7b45403062")],
    dominantColor: "#E7DECF",
    colorName: "Ivory",
    availability: "available",
    stock: 1,
    featured: true,
    limited: true,
    newArrival: true,
    popularity: 99,
    createdAt: "2024-12-01",
    orientation: "landscape",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Naïa's work transformed our home into something sacred. People fall silent when they enter the room — the painting holds the light all day.",
    author: "Isabelle Moreau",
    role: "Private Collector",
    location: "Paris, France",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "We commissioned a piece for the lobby of our gallery. The process was intimate, considered, and utterly professional. A true artist.",
    author: "Jonathan Pierce",
    role: "Gallery Director",
    location: "London, UK",
    rating: 5,
  },
  {
    id: "t3",
    quote:
      "Buying from the Naïart studio felt like joining a story rather than making a purchase. The certificate, the packaging, the care — flawless.",
    author: "Mariko Tanaka",
    role: "Architect & Collector",
    location: "Tokyo, Japan",
    rating: 5,
  },
  {
    id: "t4",
    quote:
      "Three works later, I am still discovering new things in each one. Naïa paints time itself.",
    author: "Daniel Rossi",
    role: "Interior Designer",
    location: "Milan, Italy",
    rating: 5,
  },
];

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Inspiration",
    subtitle: "Seeing",
    description:
      "Every work begins in the landscape of Provence — the quality of light at a precise hour, a colour in the salt marsh, a feeling that refuses words. Naïa keeps painted notebooks of these encounters.",
    image: u("1490750967868-88aa4486c946", 1000, 1300),
  },
  {
    index: "02",
    title: "Sketching",
    subtitle: "Listening",
    description:
      "Charcoal and ink studies follow — dozens of them — until the composition reveals its own internal logic. Most are discarded. The survivors become the architecture of the canvas.",
    image: u("1513519245088-0e12902e35ca", 1000, 1300),
  },
  {
    index: "03",
    title: "Painting",
    subtitle: "Building",
    description:
      "Layer upon layer of oil, cold wax, and pigment are applied, scraped back, and rebuilt over weeks. The surface becomes a record of every decision — and every reconsideration.",
    image: u("1579783902614-a3fb3927b6a5", 1000, 1300),
  },
  {
    index: "04",
    title: "Finishing",
    subtitle: "Releasing",
    description:
      "A final varnish, a hand-signed certificate of authenticity, museum-grade framing. Each work is photographed, catalogued, and released into the world to begin its own life.",
    image: u("1452860606245-08befc0ff44b", 1000, 1300),
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: "2009",
    title: "First brush",
    description:
      "Begins formal training at the École des Beaux-Arts, drawn from architecture to the freedom of paint.",
    location: "Marseille",
  },
  {
    year: "2014",
    title: "The Arles studio",
    description:
      "Establishes the atelier that remains her creative home, in a converted printworks bathed in southern light.",
    location: "Arles",
  },
  {
    year: "2017",
    title: "First solo exhibition",
    description:
      "“Quiet Hours” opens to critical acclaim, selling out within the opening week.",
    location: "Paris",
  },
  {
    year: "2020",
    title: "International recognition",
    description:
      "Works acquired by private collections across Europe, Asia, and North America.",
  },
  {
    year: "2023",
    title: "The Gold series",
    description:
      "A celebrated body of work exploring repair and luminosity, inspired by Japanese kintsugi.",
    location: "Tokyo · Paris",
  },
  {
    year: "2025",
    title: "Naïart online",
    description:
      "Opens her studio directly to collectors worldwide through a dedicated digital gallery.",
  },
];

export const awards: { year: string; title: string; org: string }[] = [
  { year: "2024", title: "Prix de la Jeune Peinture", org: "Fondation des Arts" },
  { year: "2022", title: "Featured Artist of the Year", org: "Contemporary Review" },
  { year: "2021", title: "Mediterranean Painting Prize", org: "Biennale du Sud" },
  { year: "2018", title: "Emerging Talent Award", org: "Salon de Provence" },
];

export const exhibitions: { year: string; title: string; venue: string; city: string }[] = [
  { year: "2025", title: "The Long Summer", venue: "Galerie Lumière", city: "Paris" },
  { year: "2024", title: "Interior Weather", venue: "Saatchi Project Space", city: "London" },
  { year: "2023", title: "Gold / Fracture", venue: "Mori Annex", city: "Tokyo" },
  { year: "2022", title: "Provençal Light", venue: "Fondation Van Gogh", city: "Arles" },
  { year: "2020", title: "Quiet Hours", venue: "Espace Mediterranée", city: "Marseille" },
];

export const journal: JournalPost[] = [
  {
    id: "j1",
    slug: "the-alchemy-of-cold-wax",
    title: "The Alchemy of Cold Wax",
    excerpt:
      "Why I abandoned smooth surfaces for the slow, sculptural language of wax and pigment.",
    category: "Journal",
    cover: u("1579783902614-a3fb3927b6a5", 1400, 1000),
    author: "Naïa Lemaire",
    readTime: 6,
    publishedAt: "2025-02-14",
    content: [
      "There is a moment, somewhere around the fifth layer, when a painting stops being a surface and becomes a body. Cold wax taught me to wait for that moment.",
      "Mixed with oil, cold wax medium dries to a matte, sculptural finish that can be carved, scraped, and polished. It refuses the slickness of varnish. It holds light the way skin does — softly, unevenly, alive.",
      "My process is slow by design. Each layer must cure before the next, and so a single painting can span forty mornings. The waiting is not lost time; it is the time in which the work decides what it wants to be.",
    ],
    tags: ["Process", "Materials", "Studio"],
  },
  {
    id: "j2",
    slug: "painting-the-provencal-light",
    title: "Painting the Provençal Light",
    excerpt:
      "A field guide to the impossible task of capturing southern light on linen.",
    category: "Tutorial",
    cover: u("1490750967868-88aa4486c946", 1400, 1000),
    author: "Naïa Lemaire",
    readTime: 8,
    publishedAt: "2025-01-20",
    content: [
      "Van Gogh came to Arles for the light, and a century later it still humbles every painter who tries to hold it. The trick, I have learned, is not to paint the light but to paint what it does.",
      "Begin with the shadow. The Provençal sun is so total that shadows become the only place colour can hide — violets, deep ambers, a green you would never expect. Build the painting from these.",
      "Then, sparingly, the light itself: a single high-key note of warm white, placed last, that makes everything around it sing.",
    ],
    tags: ["Tutorial", "Colour", "Landscape"],
  },
  {
    id: "j3",
    slug: "inside-the-arles-atelier",
    title: "Inside the Arles Atelier",
    excerpt:
      "A morning in the converted printworks where every Naïart canvas is born.",
    category: "Behind the Scenes",
    cover: u("1513519245088-0e12902e35ca", 1400, 1000),
    author: "Studio Naïart",
    readTime: 5,
    publishedAt: "2024-12-08",
    content: [
      "The studio wakes before I do. By seven, the eastern windows throw long blades of gold across the concrete floor, and the unfinished canvases catch fire one by one.",
      "I work in silence until noon. Coffee, then the first decisive marks of the day — the ones made before doubt arrives.",
      "Visitors are surprised by how quiet a working studio is. There is no drama here, only attention.",
    ],
    tags: ["Studio", "Daily Practice"],
  },
  {
    id: "j4",
    slug: "the-gold-series-and-kintsugi",
    title: "The Gold Series & the Art of Repair",
    excerpt:
      "How a broken bowl in Kyoto reshaped an entire year of painting.",
    category: "Journal",
    cover: u("1502691876148-a84978e59af8", 1400, 1000),
    author: "Naïa Lemaire",
    readTime: 7,
    publishedAt: "2024-11-02",
    content: [
      "In Kyoto I was given tea in a bowl mended with gold. The crack was not hidden — it was the most beautiful part. I thought about it for the rest of the trip, and then for the rest of the year.",
      "Kintsugi treats breakage as part of an object's history, not something to disguise. The Gold series asks the same of painting: what if the seam, the fault, the fracture were the luminous centre?",
      "Each canvas in the series carries a single line of gold leaf where the composition breaks. Collectors tell me it is the part they cannot stop looking at.",
    ],
    tags: ["Inspiration", "Gold", "Travel"],
  },
];

// ---------- Admin / commerce mock data ----------

export const orders: Order[] = [
  {
    id: "NAI-1042",
    customer: "Isabelle Moreau",
    email: "isabelle@example.com",
    date: "2025-06-09",
    total: 8600,
    status: "paid",
    items: [{ title: "The Quiet Hour", price: 8600, quantity: 1 }],
  },
  {
    id: "NAI-1041",
    customer: "Jonathan Pierce",
    email: "j.pierce@example.com",
    date: "2025-06-07",
    total: 12600,
    status: "shipped",
    items: [{ title: "Gold Fracture", price: 12600, quantity: 1 }],
  },
  {
    id: "NAI-1040",
    customer: "Mariko Tanaka",
    email: "mariko@example.com",
    date: "2025-06-04",
    total: 13800,
    status: "completed",
    items: [{ title: "The Long Summer", price: 13800, quantity: 1 }],
  },
  {
    id: "NAI-1039",
    customer: "Daniel Rossi",
    email: "d.rossi@example.com",
    date: "2025-05-30",
    total: 16700,
    status: "new",
    items: [
      { title: "The Modern Garden", price: 8900, quantity: 1 },
      { title: "Horizon Study VII", price: 5400, quantity: 1 },
    ],
  },
  {
    id: "NAI-1038",
    customer: "Elena Voss",
    email: "elena@example.com",
    date: "2025-05-22",
    total: 7200,
    status: "completed",
    items: [{ title: "Tidal Memory", price: 7200, quantity: 1 }],
  },
];

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Isabelle Moreau",
    email: "isabelle@example.com",
    location: "Paris, France",
    joinedAt: "2023-04-12",
    orders: 3,
    spend: 24800,
  },
  {
    id: "c2",
    name: "Jonathan Pierce",
    email: "j.pierce@example.com",
    location: "London, UK",
    joinedAt: "2022-11-30",
    orders: 5,
    spend: 51200,
  },
  {
    id: "c3",
    name: "Mariko Tanaka",
    email: "mariko@example.com",
    location: "Tokyo, Japan",
    joinedAt: "2024-01-08",
    orders: 2,
    spend: 21000,
  },
  {
    id: "c4",
    name: "Daniel Rossi",
    email: "d.rossi@example.com",
    location: "Milan, Italy",
    joinedAt: "2023-09-19",
    orders: 4,
    spend: 38600,
  },
];

export const commissionRequests: CommissionRequest[] = [
  {
    id: "cr1",
    name: "Sophie Laurent",
    email: "sophie@example.com",
    description:
      "A large abstract piece in warm whites for a double-height living room facing the sea.",
    size: "180 × 220 cm",
    budget: "$12,000 – $16,000",
    deadline: "2025-09-01",
    status: "pending",
    submittedAt: "2025-06-10",
  },
  {
    id: "cr2",
    name: "Hôtel Lumière",
    email: "art@hotellumiere.com",
    description:
      "Three coordinated landscape works for a hotel lobby, Provençal palette.",
    size: "Triptych, 120 × 150 cm each",
    budget: "$25,000+",
    deadline: "2025-11-15",
    status: "accepted",
    submittedAt: "2025-05-28",
  },
  {
    id: "cr3",
    name: "Marcus Chen",
    email: "m.chen@example.com",
    description: "A portrait in the style of the Interior Weather series.",
    size: "90 × 120 cm",
    budget: "$8,000 – $11,000",
    deadline: "2025-08-20",
    status: "in-progress",
    submittedAt: "2025-05-15",
  },
];

export const monthlySales = [
  { month: "Jan", revenue: 28000, orders: 4 },
  { month: "Feb", revenue: 41000, orders: 6 },
  { month: "Mar", revenue: 36000, orders: 5 },
  { month: "Apr", revenue: 52000, orders: 7 },
  { month: "May", revenue: 47000, orders: 6 },
  { month: "Jun", revenue: 61000, orders: 8 },
  { month: "Jul", revenue: 58000, orders: 7 },
  { month: "Aug", revenue: 72000, orders: 9 },
  { month: "Sep", revenue: 66000, orders: 8 },
  { month: "Oct", revenue: 81000, orders: 10 },
  { month: "Nov", revenue: 94000, orders: 12 },
  { month: "Dec", revenue: 112000, orders: 14 },
];

export const trafficData = [
  { day: "Mon", visitors: 1240 },
  { day: "Tue", visitors: 1680 },
  { day: "Wed", visitors: 1420 },
  { day: "Thu", visitors: 1980 },
  { day: "Fri", visitors: 2360 },
  { day: "Sat", visitors: 2840 },
  { day: "Sun", visitors: 2510 },
];

// ---------- helpers ----------

export const getArtwork = (slug: string) =>
  artworks.find((a) => a.slug === slug);

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);

export const getArtworksByCollection = (slug: string) =>
  artworks.filter((a) => a.collection === slug);

export const getJournalPost = (slug: string) =>
  journal.find((p) => p.slug === slug);

export const featuredArtworks = artworks.filter((a) => a.featured);
export const newArrivals = artworks.filter((a) => a.newArrival);
export const limitedEditions = artworks.filter((a) => a.limited);
