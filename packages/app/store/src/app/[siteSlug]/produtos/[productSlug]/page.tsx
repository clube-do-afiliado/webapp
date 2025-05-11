'use server';

import Image from 'next/image';
import type { Metadata } from 'next';

import { getContrastColor } from '@cda/ui/theme/utils';

import { maskCurrency } from '@cda/toolkit/mask';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { EventSource } from '@cda/services/events';
import type { Integration } from '@cda/services/integrations';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Content from '@/components/Content';
import Backdoor from '@/components/Backdoor';
import BaseProviders from '@/providers/BaseProviders';
import { baseUrl } from '@/services/core';
import { trackLDP, TrackParams } from '@/services/trackService';

import './ProductPage.scss';

interface NextPageProps<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TSearchParams extends Record<string, unknown> = Record<string, unknown>
> {
    params: Promise<TParams>;
    searchParams: Promise<TSearchParams>;
}

async function getData(siteSlug: string, productSlug: string): Promise<{
    site: Site,
    product: Product,
    integrations: Integration[],
}> {
    const res = await fetch(`${baseUrl}/api/ldp/${siteSlug}/${productSlug}`);
    return await res.json();
}

export async function generateMetadata({ params, }: NextPageProps<{
    siteSlug: string;
    productSlug: string;
}>): Promise<Metadata> {
    const { siteSlug, productSlug } = await params;

    const { site } = await getData(siteSlug, productSlug);

    return {
        title: site.information.title,
        description: site.information.description,
        icons: site.theme.favicon,
        openGraph: {
            images: site.theme.favicon,
        },
    };
}

export default async function Page({ params, searchParams }: NextPageProps<{ siteSlug: string; productSlug: string }>) {
    const { siteSlug, productSlug } = await params;
    const queryParams = await searchParams ?? {};

    const utmSource = queryParams.utm_source as EventSource;
    const utmCampaign = queryParams.utm_campaign as string;

    const {
        site,
        integrations,
        product
    } = await getData(siteSlug, productSlug);

    const integration = integrations.find(i => i.id === product.integration) as Integration;

    const { primaryColor, secondaryColor } = site.theme;

    const trackParams: TrackParams = {
        storeId: site.id,
        productId: product.id,
        utmSource,
        utmCampaign
    };

    await trackLDP(site.slug, product.id, trackParams);

    return (
        <BaseProviders site={site}>
            <Backdoor
                url={product.url}
                siteSlug={site.slug}
                productSlug={product.slug}
                params={trackParams}
            />
            <div className="product-page">
                <Header site={site} />
                <Content>
                    <div className="product-page__content">
                        <div className="product-page__content__integration">
                            <Image
                                src={integration.image}
                                alt={`Um produto ${integration.name}`}
                                loading="lazy"
                                className="product-page__content__integration-box"
                                width={36}
                                height={36}
                            />

                            <p>Parceiro {integration.name}</p>
                        </div>
                        <div className="product-page__content__image">
                            <div className="product-page__content__image-container">
                                <Image
                                    width={550}
                                    height={550}
                                    loading="lazy"
                                    alt={product.name}
                                    src={product.images[0]}
                                    className="product-image"
                                />
                            </div>
                        </div>
                        <h1>{product.name}</h1>
                        <div className="info-price">
                            <h3>{maskCurrency(product.originalPrice * 100)}</h3>
                            <h2 style={{ color: primaryColor }}>
                                {maskCurrency(product.price * 100)}
                            </h2>
                        </div>
                        <button
                            className="promotion-button"
                            style={{
                                background: secondaryColor,
                                color: getContrastColor(secondaryColor)
                            }}
                        >
                            <i className="uil uil-external-link-alt"></i>
                            Ver promoção
                        </button>
                    </div>
                </Content>
                <Footer site={site} />
            </div>
        </BaseProviders>
    );
}
