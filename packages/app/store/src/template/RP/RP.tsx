'use client';

import { useEffect } from 'react';

import type { Site } from '@cda/services/sites';
import type { Product } from '@cda/services/products';
import type { Integration } from '@cda/services/integrations';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import Products from '@/components/Products';
import BaseProviders from '@/providers/BaseProviders';
import { trackRP, type TrackParams } from '@/services/trackService';

interface RPProps {
    site: Site;
    params: Omit<TrackParams, 'anonymousId'>;
    products: Product[];
    integrations: Integration[];
}
export default function RP({ site, products, integrations, params }: RPProps) {
    useEffect(() => { trackRP(site.slug, params); }, []);

    return (
        <BaseProviders site={site}>
            <div className="products-page">
                <Header site={site} />
                <Content title="Produtos">
                    <Products
                        site={site}
                        products={products}
                        integrations={integrations}
                    />
                </Content>
                <Footer site={site} />
            </div>
        </BaseProviders>
    );
}