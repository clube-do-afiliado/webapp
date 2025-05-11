import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
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
    return (
        <div className="grid">
            {
                Boolean(products.length) && products.map(p => (
                    <a key={p.id} className="grid__item" href={`${url.store}/${site.slug}/produtos/${p.slug}`}>
                        <ProductCard site={site} product={p} integrations={integrations} />
                    </a>
                ))
            }
        </div>
    );
}