export type Availability = "available" | "sold" | "reserved" | "commission";

export type CollectionSlug =
  | "abstract"
  | "modern"
  | "landscape"
  | "portrait"
  | "custom";

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  year: number;
  price: number;
  collection: CollectionSlug;
  medium: string;
  dimensions: string;
  description: string;
  story: string;
  images: string[];
  dominantColor: string;
  colorName: string;
  availability: Availability;
  stock: number;
  featured: boolean;
  limited: boolean;
  newArrival: boolean;
  popularity: number;
  createdAt: string;
  orientation: "portrait" | "landscape" | "square";
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
  cover: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Journal" | "Tutorial" | "Behind the Scenes" | "Events";
  cover: string;
  author: string;
  readTime: number;
  publishedAt: string;
  content: string[];
  tags: string[];
}

export interface ProcessStep {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  location?: string;
}

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  medium: string;
  dimensions: string;
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: "new" | "paid" | "shipped" | "completed" | "refunded" | "cancelled";
  items: { title: string; price: number; quantity: number }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  joinedAt: string;
  orders: number;
  spend: number;
}

export interface CommissionRequest {
  id: string;
  name: string;
  email: string;
  description: string;
  size: string;
  budget: string;
  deadline: string;
  status: "pending" | "accepted" | "rejected" | "in-progress";
  submittedAt: string;
}
