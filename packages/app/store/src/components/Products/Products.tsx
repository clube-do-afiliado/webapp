import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { Integration } from '@cda/services/integrations';

import { EmptyContent } from '@cda/common/EmptyContent';

import ProductCard from '@/components/ProductCard';

import './Products.scss';

interface ProductsProps {
    site: Site;
    products: Product[];
    integrations: Integration[];
}
export default function Products({ site, products, integrations }: ProductsProps) {
    return (
        <>
            {
                Boolean(products.length) && (
                    <div className="grid">
                        {
                            products.map(p => (
                                <ProductCard key={p.id} site={site} product={p} integrations={integrations} />
                            ))
                        }
                    </div>
                )
            }
            {
                !products.length && (
                    <EmptyContent
                        icon="box"
                        message="Nenhum produto foi encontrado"
                    />
                )
            }
        </>

    );
}