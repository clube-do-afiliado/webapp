import type { Site } from '@cda/services/sites';

interface ProductsProps { site: Site }
export default function Products({ site }: ProductsProps) {

    return (
        <div>
            {site.id}
            lista de produtos
        </div>
    );
}