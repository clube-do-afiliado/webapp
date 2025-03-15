export interface Product {
    name: string;
    price: number;
    tags: string[];
    images: string[];
}

export interface Information {
    title: string;
    description: string;
}

export interface SiteTheme {
    logo: string;
    favicon: string;
    headerColor: string;
    primaryColor: string;
    secondaryColor: string;
}

export interface Social {
    tiktok: string;
    twitter: string;
    youtube: string;
    threads: string;
    telegram: string;
    whatsapp: string;
    facebook: string;
    instagram: string;
}

export interface Site {
    id: string;
    slug: string;
    name: string;
    ownerId: string;
    socials: Social;
    theme: SiteTheme;
    products: Product[];
    information: Information;
}