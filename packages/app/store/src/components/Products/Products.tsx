import { getParams, serialize } from '@cda/toolkit/url';
import { removeEmptyProperties } from '@cda/toolkit/object';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { EventSource } from '@cda/services/events';
import type { Integration } from '@cda/services/integrations';

import ProductCard from '@/components/ProductCard';
import { url } from '@/services/core';

import './Products.scss';

interface ProductsProps {
    site: Site;
    products: Product[];
    integrations: Integration[];
}
export default function Products({ site, products, integrations }: ProductsProps) {
    const getUrl = (product: Product) => {

        const params = getParams<{ utm_source: EventSource; utm_campaing: string }>();

        const queryparams = serialize(params);
        const productUrl = `${url.store}/${site.slug}/produtos/${product.slug}`;

        if (queryparams) { return `${productUrl}?${queryparams}`; }

        return productUrl;
    };

    return (
        <div className="grid">
            {
                Boolean(products.length) && products.map(p => (
                    <a key={p.id} className="grid__item" href={getUrl(p)}>
                        <ProductCard site={site} product={p} integrations={integrations} />
                    </a>
                ))
            }
        </div>
    );
}