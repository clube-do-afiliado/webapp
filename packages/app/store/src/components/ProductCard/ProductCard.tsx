import { useMemo } from 'react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { getContrastColor } from '@cda/ui/theme/utils';

import { serialize } from '@cda/toolkit/url';
import { removeEmptyProperties } from '@cda/toolkit/object';
import { maskCurrency, maskPercent } from '@cda/toolkit/mask';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { Integration } from '@cda/services/integrations';

import { url } from '@/services/core';

import './ProductCard.scss';

interface ProductCardProps { site: Site; product: Product, integrations: Integration[]; }
export default function ProductCard({ site, product, integrations }: ProductCardProps) {
    const searchParams = useSearchParams();

    const { secondaryColor } = site.theme;

    const integration = integrations.find(i => i.id === product.integration) as Integration;

    const productUrl = useMemo(() => {
        const utm_source = searchParams.get('utm_source');
        const utm_campaign = searchParams.get('utm_campaign');

        const queryparams = serialize(
            removeEmptyProperties({ utm_source, utm_campaign })
        );

        return [`${url.store}/${site.slug}/produtos/${product.slug}`, queryparams]
            .filter(Boolean)
            .join('?');
    }, []);

    return (
        <a className="grid__item" href={productUrl}>
            <article className="product-card">
                <div className="product-header">
                    {
                        Boolean(product.originalPrice) && (
                            <span
                                className="product-discount"
                                style={{
                                    background: secondaryColor,
                                    color: getContrastColor(secondaryColor)
                                }}
                            >
                                - {maskPercent(1 - (product.price / product.originalPrice))}
                            </span>
                        )
                    }
                </div>
                <div className="product-image-container">
                    <Image
                        fill
                        loading="lazy"
                        alt={product.name}
                        className="product-image"
                        src={`/api/image-proxy?url=${encodeURIComponent(product.images[0])}`}
                    />
                </div>
                <div className="product-integration-container">
                    <Image
                        src={integration.image}
                        alt={`Um produto ${integration.name}`}
                        loading="lazy"
                        className="product-integration"
                        width={36}
                        height={36}
                    />
                </div>

                <div className="product-info">
                    <h3 className="product-title">{product.name}</h3>

                    <div className="product-price-container">
                        {
                            Boolean(product.originalPrice) && (
                                <span className="product-original-price">
                                    {maskCurrency(product.originalPrice * 100)}
                                </span>
                            )
                        }
                        <span
                            className="product-price"
                            style={{ color: secondaryColor }}
                        >
                            {maskCurrency(product.price * 100)}
                        </span>
                    </div>
                </div>
            </article>
        </a>
    );
}