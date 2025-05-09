import { getAmazonInfo } from '../scrapings/amazon';
import { getMagaluInfo } from '../scrapings/magalu';
import { getShopeeInfo } from '../scrapings/shopee';
import { getMercadoLivreInfo, getProductMercadoLivre } from '../scrapings/mercadoLivre';
import type { Info } from '../scrapings/interface';

chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
    if (message.type === 'GET_PAGE_TITLE') {
        const href = window.location.href;

        let info!: Info;

        const isMagalu = href.match('https://www.magazinevoce.com.br/[a-zA-Z0-9-_].*/');
        const isShopee = href.match('https://shopee.com.br/*');
        const isAmazon = href.match('https://www.amazon.com.br/*');
        const isMercadoLivre = href.match('https://www.mercadolivre.com/*');
        const isProductMercadoLivre = href.match('https://produto.mercadolivre.com.br/*');

        if (isMagalu) { info = await getMagaluInfo(); }
        if (isShopee) { info = await getShopeeInfo(); }
        if (isAmazon) { info = await getAmazonInfo(); }
        if (isMercadoLivre) { info = await getMercadoLivreInfo(); }
        if (isProductMercadoLivre) { info = await getProductMercadoLivre(); }

        if (!info) {
            sendResponse({ error: 'not_found' });
            return true;
        }

        sendResponse(info);

        return true;
    }
});