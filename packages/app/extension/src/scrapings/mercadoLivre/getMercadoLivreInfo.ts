import type { Info } from '../interface';
import { sanitizeCurrency } from '../sanitizeCurrency';

export async function getMercadoLivreInfo(): Promise<Info> {
    const mainContainer = document.getElementById('ui-pdp-main-container');

    const productContainer = mainContainer?.querySelector('div > div > div');

    const rowContainer = productContainer?.getElementsByClassName('ui-pdp-container__row')[1];

    const image = rowContainer?.querySelector('figure > img');

    const title = rowContainer?.querySelector('H1');

    const price = rowContainer?.querySelector('[itemprop=\'price\']') as HTMLMetaElement;
    const originalPrice = rowContainer?.querySelector('[aria-roledescription=\'Valor\']') as HTMLMetaElement;

    return {
        integration: 'mercado-livre',
        img: image?.getAttribute('src') || '',
        title: (title?.textContent || '').trim(),
        price: Number(price?.content) || 0,
        originalPrice: sanitizeCurrency(originalPrice.textContent || ''),
    };
}