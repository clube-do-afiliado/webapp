import Base from '@/template/Base';
import HomePage from '@/template/Home';

export const dynamic = 'force-static';

export const metadata = {
    title: 'Clube do Afiliado — Ferramentas para aumentar seus ganhos',
    // eslint-disable-next-line
    description: 'Crie links, banners e monitore seus ganhos com a melhor plataforma para afiliados. Tudo gratuito, fácil de usar e com suporte especializado.',

    openGraph: {
        title: 'Clube do Afiliado — Ferramentas para aumentar seus ganhos',
        description: 'Crie links, banners e monitore seus ganhos com a melhor plataforma para afiliados.',
        url: 'https://clubedoafiliado.com', // ajuste para sua URL
        siteName: 'Clube do Afiliado',
        images: [
            {
                url: 'https://cdn.clubedoafiliado.com/assets/og-image.jpg', // imagem de 1200x630 ideal
                width: 1200,
                height: 630,
                alt: 'Clube do Afiliado - painel de afiliado e recursos visuais',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Clube do Afiliado — Ferramentas para aumentar seus ganhos',
        description: 'Crie links, banners e monitore seus ganhos com a melhor plataforma para afiliados.',
        images: ['https://cdn.clubedoafiliado.com/assets/og-image.jpg'],
        site: '@clubedoafiliado', // se houver Twitter
    },

    metadataBase: new URL('https://clubedoafiliado.com'),
};

export default async function Home() {
    return (
        <Base>
            <HomePage />
        </Base>
    );
}
