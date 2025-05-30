export interface Product {
    id: string;
    storeId: string;

    url: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number;

    visible: boolean;
    shortUrl?: string;
    integration: string;

    tags: string[];
    images: string[];
}

export interface ProductInfo {
    img: string;
    title: string;
    price: number;
    originalPrice: number;
    integration: string;
}