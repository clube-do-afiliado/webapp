import type { Info } from '../interface';

export async function getMagaluInfo(): Promise<Info> {
    const infoSection = document.getElementsByTagName('SECTION')[4];

    const title = document.querySelector('H1[data-testid="heading-product-title"]');
    const img = document.querySelector('img[data-testid="image-selected-thumbnail"]');
    const priceEl = infoSection.querySelector('p[data-testid="price-value"]');
    const priceOriginalEl = infoSection.querySelector('p[data-testid="price-original"]');

    const price = priceEl?.textContent?.replace(/[^\d,]/g, '').replace(',', '.');
    const originalPrice = priceOriginalEl?.textContent?.replace(/[^\d,]/g, '').replace(',', '.');

    return {
        integration: 'magazine-luiza',
        title: title?.textContent || '',
        img: img?.getAttribute('src') || '',
        price: Number(price) || 0,
        originalPrice: Number(originalPrice) || 0,
    };
}