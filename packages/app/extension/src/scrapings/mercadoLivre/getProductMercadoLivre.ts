import type { Info } from '../interface';
import { sanitizeCurrency } from '../sanitizeCurrency';

export async function getProductMercadoLivre(): Promise<Info> {
    const mainContainer = document.getElementById('ui-pdp-main-container');

    const image = mainContainer?.querySelector('img[data-zoom]');
    const productContainer = mainContainer?.querySelector('div > div > div > div > div > div:nth-of-type(1) > div');

    const title = productContainer?.querySelector('div:nth-of-type(2) > div > div:nth-of-type(2)');

    const pricesSection = document?.getElementById('price');

    const originalPriceEl = pricesSection?.querySelector('div > div:nth-of-type(1) > span');
    const price = pricesSection?.querySelector('[itemprop=\'price\']') as HTMLMetaElement;

    return {
        integration: 'mercado-livre',
        img: image?.getAttribute('src') || '',
        title: (title?.textContent || '').trim(),
        price: Number(price?.content),
        originalPrice: sanitizeCurrency(originalPriceEl?.textContent || ''),
    };
}