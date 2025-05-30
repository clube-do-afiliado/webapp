'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import Icon from '@cda/ui/components/Icon';
import Button from '@cda/ui/components/Button';
import Typography from '@cda/ui/components/Typography';

import { maskCurrency } from '@cda/toolkit/mask';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { Integration } from '@cda/services/integrations';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import Backdoor from '@/components/Backdoor';
import BaseProviders from '@/providers/BaseProviders';
import { trackImpression, trackLDP, type TrackParams } from '@/services/trackService';

import './LDP.scss';

interface LDPProps {
    site: Site;
    product: Product;
    integration: Integration;
    trackParams: Omit<TrackParams, 'anonymousId'>;
}
export default function LDP({ site, product, integration, trackParams }: LDPProps) {
    const { primaryColor } = site.theme;

    useEffect(() => { handleTrackVisualization(); }, []);

    const goToProductUrl = async () => {
        window.open(product.url, '_blank');
        handleTrackImpression();
    };

    const handleTrackVisualization = async () => {
        await trackLDP(
            site.slug,
            product.slug,
            trackParams
        );
    };

    const handleTrackImpression = async () => {
        await trackImpression(
            site.slug,
            product.slug,
            trackParams
        );
    };

    return (
        <BaseProviders site={site}>
            <Backdoor onClick={goToProductUrl} />
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

                            <Typography color="text.secondary">Parceiro {integration.name}</Typography>
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
                        <Typography noMargin variant="h3">{product.name}</Typography>
                        <div className="info-price">
                            {
                                Boolean(product.originalPrice) && (
                                    <Typography
                                        noMargin
                                        variant="h6"
                                        color="text.secondary"
                                        style={{ textDecoration: 'line-through' }}
                                    >
                                        {maskCurrency(product.originalPrice * 100)}
                                    </Typography>
                                )
                            }
                            <Typography noMargin variant="h4" style={{ color: primaryColor }}>
                                {maskCurrency(product.price * 100)}
                            </Typography>
                        </div>
                        <Button
                            onClick={goToProductUrl}
                            startIcon={<Icon name="external-link-alt" />}
                        >
                            Ver promoção
                        </Button>
                    </div>
                </Content>
                <Footer site={site} />
            </div>
        </BaseProviders>
    );
}