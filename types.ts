// FIX: Added import for React to define React.ReactNode.
import React from 'react';

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  relation: string;
}

// FIX: Add and export the missing 'BlogPost' interface to resolve import errors.
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  image: string;
  excerpt: string;
  content: any; // Represents Contentful's rich text field
  author: string;
  publishedDate: string;
}
