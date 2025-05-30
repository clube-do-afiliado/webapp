import Image from 'next/image';

import { getContrastColor } from '@cda/ui/theme/utils';

import { getParams, serialize } from '@cda/toolkit/url';

import { Site } from '@cda/services/sites';

import { url } from '@/services/core';

import './Header.scss';

interface HeaderProps { site: Site; }
export default function Header({ site }: HeaderProps) {
    const params = getParams<{ utm_source: EventSource; utm_campaing: string }>();

    const queryparams = serialize(params);
    const productsUrl = `${url.store}/${site.slug}/produtos?${queryparams}`;
    const homeUrl = `${url.store}/${site.slug}?${queryparams}`;

    console.log(productsUrl);

    return (
        <header className="header" style={{
            background: site.theme.primaryColor,
            color: getContrastColor(site.theme.primaryColor)
        }}>
            <div className="container">
                <div className="info">
                    <a href={homeUrl}>
                        <Image
                            fill
                            loading="eager"
                            src={site.theme.logo}
                            alt={site.information.description}
                            style={{ objectFit: 'contain', objectPosition: 'left' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </a>
                </div>
                <nav className="buttons">
                    <ul>
                        <li>
                            <a
                                href={productsUrl}
                                style={{ color: getContrastColor(site.theme.primaryColor) }}
                            >
                                Produtos
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}