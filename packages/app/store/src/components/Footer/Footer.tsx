import Icon from '@cda/ui/components/Icon';
import Logo from '@cda/ui/components/Logo';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Divider from '@cda/ui/components/Divider';
import Typography from '@cda/ui/components/Typography';
import { getContrastColor } from '@cda/ui/theme/utils';

import type { Site } from '@cda/services/sites';

import './Footer.scss';

interface FooterProps { site: Site; }
export default function Footer({ site }: FooterProps) {
    const background = site.theme.primaryColor;
    const color = getContrastColor(background);

    const hasSocial = Object.keys(site.socials).some(k => site.socials[k]);

    const goTo = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <footer className="footer">
            <div className="container">
                {
                    hasSocial && (
                        <>
                            <Typography noMargin textAlign="center" color="text.secondary">
                                Siga nas redes sociais:
                            </Typography>
                            <Stack
                                orientation="row"
                                alignItems="center"
                                justifyContent="center"
                                style={{ flexWrap: 'wrap' }}
                            >
                                {
                                    Object.entries(site.socials)
                                        .map(([key, value]) => value && (
                                            <Avatar
                                                key={key}
                                                icon={<Icon name={key} style={{ color }} />}
                                                style={{ backgroundColor: background }}
                                                onClick={() => goTo(value)}
                                            />
                                        ))
                                }
                            </Stack>
                        </>
                    )
                }
                <Typography noMargin textAlign="center" color="text.secondary" style={{ fontSize: 12 }}>
                    Direitos autorais @ {new Date().getFullYear()} - {site.information.name}
                </Typography>

                <Divider />

                <ul className="security">
                    <li>
                        <Logo width={100} secondary="text.primary" />
                    </li>
                    <li>
                        <span className="create-info">© 2025 - Powered by <a href="">Clube do Afiliado</a>™</span>
                    </li>
                </ul>
            </div>
        </footer >
    );
}