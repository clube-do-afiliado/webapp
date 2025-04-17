import type { Product } from '@cda/services/products';

export type ProductForm = Omit<Product, 'id' | 'slug' | 'visible' | 'images'> & { image: string; };