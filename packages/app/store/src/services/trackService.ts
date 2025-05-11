import type { EventData } from '@cda/services/events';

import { baseUrl } from './core';

export type Action = 'visualization' | 'impression';
export type TrackParams =
    Pick<EventData, 'utmSource' | 'utmCampaign'>
    & { storeId: string; productId?: string };

export async function trackRP(
    siteSlug: string,
    { storeId, utmSource, utmCampaign }: TrackParams
) {
    return await fetch(`${baseUrl}/api/rp/${siteSlug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            storeId,
            utmSource,
            utmCampaign
        })
    });
};

export async function trackLDP(
    siteSlug: string,
    productSlug: string,
    { utmSource, utmCampaign, storeId, productId }: TrackParams
) {
    return await fetch(`${baseUrl}/api/ldp/${siteSlug}/${productSlug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'visualization',
            data: {
                storeId,
                productId,
                utmSource,
                utmCampaign
            }
        })
    });
};

export async function trackImpression(
    siteSlug: string,
    productSlug: string,
    { storeId, productId, utmSource, utmCampaign }: TrackParams
) {
    return await fetch(`${baseUrl}/api/ldp/${siteSlug}/${productSlug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'impression',
            data: {
                storeId,
                productId,
                utmSource,
                utmCampaign
            }
        })
    });
};