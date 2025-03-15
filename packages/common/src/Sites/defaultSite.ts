import { themeDefaultLight } from '@cda/ui/theme';

import { slug } from '@cda/toolkit/string';

import type { Site } from '@cda/services/sites';

export default function generateDefaultSite(nameSite: string, ownerId: string): Omit<Site, 'id'> {
    const { palette } = themeDefaultLight;
    return {
        name: nameSite,
        slug: slug(nameSite),
        ownerId: ownerId,
        information: {
            title: nameSite,
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
            headerColor: palette.primary,
            primaryColor: palette.primary,
            secondaryColor: palette.secondary
        }
    };
}