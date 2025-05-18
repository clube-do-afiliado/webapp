import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import { Card, CardContent } from '@cda/ui/components/Card';
import Typography from '@cda/ui/components/Typography';
import Icon from '@cda/ui/components/Icon';

import { useSites } from '@cda/common/Sites';

import './Preview.scss';

export default function Preview() {
    const { userSites } = useSites();

    const site = userSites[0];

    if (!site) { return; }

    return (
        <Card className="preview">
            <CardContent>
                <Stack>
                    <Stack alignItems="center" spacing="small">
                        <Avatar src={site.theme.logo} />
                        <Typography noMargin style={{ fontSize: 12, fontWeight: 600 }}>
                            {site.information.name}
                        </Typography>
                        <Typography noMargin style={{ fontSize: 10 }}>
                            Minha apresentação de perfil
                        </Typography>
                        <Stack
                            spacing="small"
                            orientation="row"
                            justifyContent="center"
                            style={{ flexWrap: 'wrap' }}
                        >
                            {
                                Object.entries(site.socials).map(([social, url]) => (
                                    url && (
                                        <Avatar
                                            key={social}
                                            icon={<Icon name={social} style={{
                                                fontSize: 10,
                                                color: site.theme.primaryColor
                                            }} />}
                                            style={{ width: 20, height: 20 }}
                                        />
                                    )
                                ))
                            }
                        </Stack>
                    </Stack>
                    <Stack spacing="small">
                        <button className="preview__button">button</button>
                        <button className="preview__button">button</button>
                        <button className="preview__button">button</button>
                        <button className="preview__button">button</button>
                        <button className="preview__button">button</button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card >
    );
}