import type { Info } from '../interface';
import { sanitizeCurrency } from '../sanitizeCurrency';

export async function getAmazonInfo(): Promise<Info> {
    const title = document.getElementById('title');

    const imageContainer = document.getElementById('imgTagWrapperId');

    const infoPriceSection = document.getElementById('corePriceDisplay_desktop_feature_div') as HTMLElement;

    const [priceSection, originalPriceSection] = infoPriceSection.getElementsByTagName('DIV');

    const originalPriceEl = originalPriceSection?.getElementsByClassName('a-offscreen')[0];

    const priceEl = priceSection?.getElementsByClassName('aok-offscreen')[0];

    const image = imageContainer?.querySelector('img');

    return {
        integration: 'amazon',
        img: image?.getAttribute('src') || '',
        title: (title?.textContent || '').trim(),
        price: sanitizeCurrency(priceEl?.textContent || ''),
        originalPrice: sanitizeCurrency(originalPriceEl?.textContent || ''),
    };
}