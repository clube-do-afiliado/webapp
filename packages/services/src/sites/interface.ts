import { Product } from '../products';

export interface Information {
    name: string;
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
    ownerId: string;
    socials: Social;
    theme: SiteTheme;
    products: Product[];
    information: Information;
}