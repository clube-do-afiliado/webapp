import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';

interface ProductsProps { site: Site; products: Product[] }
export default function Products({ products }: ProductsProps) {

    return (
        <div>
            {
                Boolean(products.length) && products.map(p => (
                    <div key={p.id}>{p.name}</div>
                ))
            }
        </div>
    );
}