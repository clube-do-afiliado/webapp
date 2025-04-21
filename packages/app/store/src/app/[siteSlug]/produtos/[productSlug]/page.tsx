import { baseUrl } from '@/services/core';

interface NextPageProps<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TSearchParams extends Record<string, unknown> = Record<string, unknown>
> {
    params: Promise<TParams>;
    searchParams: Promise<TSearchParams>;
}

export default async function Page({ params }: NextPageProps<{ siteSlug: string; productSlug: string }>) {
    const { siteSlug, productSlug } = await params;

    console.log('SLUG', productSlug);

    const res = await fetch(`${baseUrl}/api/ldp/${siteSlug}/${productSlug}`);
    const {
        // site,
        // integrations,
        product
    } = await res.json();

    return (
        <pre>{JSON.stringify(product, null, 2)}</pre>
    );
}
