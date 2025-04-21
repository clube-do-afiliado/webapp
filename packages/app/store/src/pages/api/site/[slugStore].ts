import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('%%%%%% API');

        // const site = await sitesServices.getUserStoresBySlug('loja-pam-beesly');

        const site = {
            ownerId: 'ownerId',
            information: {
                name: 'nameSite',
                title: 'nameSite',
                description: 'Essa é minha loja de promoções'
            },
            products: [],
            socials: {
                facebook: '',
                instagram: '',
                telegram: '',
                threads: '',
                tiktok: '',
                twitter: '',
                whatsapp: '',
                youtube: ''
            },
            theme: {
                favicon: 'https://cdn.clubedoafiliado.com/assets/favicon/favicon.svg',
                logo: 'https://cdn.clubedoafiliado.com/assets/favicon/favicon.svg',
                headerColor: '#1abc9c',
                primaryColor: '#1abc9c',
                secondaryColor: '#1abc9c'
            }
        };

        console.log('>>>>> QUERY', req.query);
        console.log('##### SITE', site);

        res.status(200).json(site);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}