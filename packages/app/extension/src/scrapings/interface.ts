export type Integration =
    | 'shopee'
    | 'amazon'
    | 'mercado-livre'
    | 'magazine-luiza'

export type Info = {
    integration: Integration;
    img: string;
    title: string;
    price: number;
    originalPrice: number;
}
