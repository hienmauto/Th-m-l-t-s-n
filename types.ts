export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  carModel: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HERO = 'hero',
  FEATURES = 'features',
  PRODUCTS = 'products',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact'
}