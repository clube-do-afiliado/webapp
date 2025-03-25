export interface Product {
    id: string;
    storeId: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;
    tags: string[];
    images: string[];
    integration: string;
    visible: boolean;
}

export interface ProductInfo {
    img: string;
    title: string;
    price: number;
    originalPrice: number;
    integration: string;
}