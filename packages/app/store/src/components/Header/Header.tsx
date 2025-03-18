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
                            src={site.theme.logo}
                            width={50}
                            height={30}
                            alt={site.information.description}
                        />
                    </a>
                </div>
                <nav className="buttons">
                    <ul>
                        <li>
                            <a href={`${url.store}/${site.slug}/produtos`}>Produtos</a>
                        </li>
                        <li>
                            <a href="reviews">Reviews</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}