import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Content from '@/components/Content';
import { baseUrl } from '@/services/core';

// import BaseProviders from '@/providers/BaseProviders';

export const runtime = 'nodejs';

interface NextPageProps<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TSearchParams extends Record<string, unknown> = Record<string, unknown>
> {
    params: Promise<TParams>;
    searchParams: Promise<TSearchParams>;
}

export default async function Store({ params }: NextPageProps<{ slug: string }>) {
    console.log('@@@@@@@@ STORE');

    const { slug } = await params;

    const res = await fetch(`${baseUrl}/api/site/${slug}`, {
        cache: 'no-store'
    });

    const site = await res.json();

    if (!site) { return; }

    return (
        // <BaseProviders site={site}>
        <>
            <Header site={site} />
            <Content title="Home">
                <div>home</div>
            </Content>
            <Footer site={site} />
        </>
        // </BaseProviders>
    );
}
