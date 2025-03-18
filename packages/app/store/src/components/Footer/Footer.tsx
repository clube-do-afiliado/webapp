import Image from 'next/image';

import { getContrastColor } from '@cda/ui/theme/utils';

import type { Site, Social } from '@cda/services/sites';

import './Footer.scss';
import SocialButton from '../SocialButton';

interface FooterProps { site: Site; }
export default function Footer({ site }: FooterProps) {
    const background = getContrastColor(site.theme.headerColor);
    const color = getContrastColor(background);

    return (
        <footer className="footer">
            <div className="container">
                <span style={{ textAlign: 'center' }}>Siga nas redes sociais:</span>
                <div className="socials">
                    {
                        Object.entries(site.socials)
                            .map(([key, value]) => value && (
                                <SocialButton
                                    key={key}
                                    social={key as keyof Social}
                                    value={value}
                                    background={background}
                                    color={color}
                                />
                            ))
                    }
                </div>

                <div className="create-info">
                    Direitos autorais @ {new Date().getFullYear()} - {site.information.name}
                </div>

                <div className="divider" />
                <ul className="security">
                    <li>
                        <Image
                            src="https://cdn.awsli.com.br/1879/1879961/arquivos/site-protegido.png"
                            width={124}
                            height={51}
                            loading="lazy"
                            alt="Compra segura"
                            decoding="async"
                        />
                    </li>
                    <li>
                        <span className="create-info">© 2025 - Powered by <a href="">Clube do Afiliado</a>™</span>
                    </li>
                </ul>
            </div>
        </footer>
    );
}