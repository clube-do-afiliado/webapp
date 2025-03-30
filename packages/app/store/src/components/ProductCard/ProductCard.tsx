import Link from 'next/link';
import Image from 'next/image';

import { maskCurrency, maskPercent } from '@cda/toolkit/mask';

import type { Product } from '@cda/services/products';
import type { Integration } from '@cda/services/integrations';

import './ProductCard.scss';

interface ProductCardProps { product: Product, integrations: Integration[]; }
export default function ProductCard({ product, integrations }: ProductCardProps) {
    const integration = integrations.find(i => i.id === product.integration) as Integration;

    return (
        <article className="product-card">
            <div className="product-header">
                {
                    Boolean(product.originalPrice) && (
                        <span className="product-discount">
                            - {maskPercent(product.price / product.originalPrice)}
                        </span>
                    )
                }
            </div>
            <div className="product-image-container">
                <Image
                    fill
                    loading="lazy"
                    alt="Nome do produto"
                    className="product-image"
                    src={product.images[0]}
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
                    <span className="product-price">{maskCurrency(product.price * 100)}</span>
                </div>
            </div>
        </article>
    );
}