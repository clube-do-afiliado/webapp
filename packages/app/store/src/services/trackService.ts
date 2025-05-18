import { Cookies } from '@cda/toolkit/dom';
import { uuid } from '@cda/toolkit/uuid';

import type { EventData } from '@cda/services/events';

import { baseUrl } from './core';

export type Action = 'visualization' | 'impression';
export type TrackParams =
    Pick<EventData, 'utmSource' | 'utmCampaign' | 'anonymousId'>
    & { storeId: string; productId?: string };

export async function trackRP(
    siteSlug: string,
    { storeId, utmSource, utmCampaign }: Omit<TrackParams, 'anonymousId'>
) {
    return await fetch(`${baseUrl}/api/rp/${siteSlug}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            storeId,
            utmSource,
            utmCampaign,
            anonymousId: getAnonymousId(),
        })
    });
};

export async function trackLDP(
    siteSlug: string,
    productSlug: string,
    { utmSource, utmCampaign, storeId, productId }: Omit<TrackParams, 'anonymousId'>
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
                utmCampaign,
                anonymousId: getAnonymousId(),
            }
        })
    });
};

export async function trackImpression(
    siteSlug: string,
    productSlug: string,
    { storeId, productId, utmSource, utmCampaign }: Omit<TrackParams, 'anonymousId'>
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
                utmCampaign,
                anonymousId: getAnonymousId(),
            }
        })
    });
};

function getAnonymousId() {
    const cookies = new Cookies<'anonymousId'>();

    let anonymousId = cookies.get('anonymousId');

    if (!anonymousId) {
        anonymousId = uuid();
        cookies.set('anonymousId', anonymousId);
    }

    return anonymousId;
}