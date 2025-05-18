import Image from 'next/image';

import { getContrastColor } from '@cda/ui/theme/utils';

import { Site } from '@cda/services/sites';

import { url } from '@/services/core';

import './Header.scss';

interface HeaderProps { site: Site; }
export default function Header({ site }: HeaderProps) {
    return (
        <header className="header" style={{
            background: site.theme.primaryColor,
            color: getContrastColor(site.theme.primaryColor)
        }}>
            <div className="container">
                <div className="info">
                    <a href={`${url.store}/${site.slug}`}>
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
                                href={`${url.store}/${site.slug}/produtos`}
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