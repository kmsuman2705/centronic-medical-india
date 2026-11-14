export type PageId =
  | 'home'
  | 'about'
  | 'products'
  | 'centrifuges'
  | 'histology'
  | 'quality'
  | 'contact';

export type ProductCategory =
  | 'centrifuges'
  | 'cassettes'
  | 'biopsy'
  | 'moulds'
  | 'blades'
  | 'processing-materials'
  | 'consumables'
  | 'cytology';

export interface ProductItem {
  id: string;
  name: string;
  series?: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  specs: { label: string; value: string }[];
  packaging?: string;
  image: string;
  isUpcoming?: boolean;
  applications?: string[];
  formats?: string[];
}

export interface QuoteCartItem {
  product: ProductItem;
  quantityNote?: string;
}

export interface ContactFormSubmission {
  name: string;
  organization: string;
  designation?: string;
  email: string;
  phone: string;
  city: string;
  selectedProducts: string[];
  message: string;
  inquiryType: 'pricing' | 'dealership' | 'sample' | 'technical';
}
