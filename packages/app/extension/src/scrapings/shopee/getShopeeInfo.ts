import type { Info } from '../interface';
import { sanitizeCurrency } from '../sanitizeCurrency';

export async function getShopeeInfo(): Promise<Info> {
    const main = document.querySelector('[role="main"]');

    if (!main) { throw new Error('main is not defined'); }

    const [, images, infos] = main.getElementsByTagName('SECTION');

    const title = infos.querySelector('h1');

    const pricesSectionEl = infos.querySelector('[aria-live="polite"] > div');

    if (!pricesSectionEl) { throw new Error('pricesSectionEl is not defined'); }

    const [priceEl, originalPriceEl] = pricesSectionEl.getElementsByTagName('div');

    const price = priceEl && priceEl.textContent;
    const originalPrice = originalPriceEl && originalPriceEl.textContent;

    const image = images.querySelector('div > div > div > picture > img');

    return {
        integration: 'shopee',
        title: title?.textContent || '',
        img: image?.getAttribute('src') || '',
        price: price ? sanitizeCurrency(price.split('-')[0]) : 0,
        originalPrice: originalPrice ? sanitizeCurrency(originalPrice.split('-')[0]) : 0,
    };
}