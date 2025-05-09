import { useMemo, useRef } from 'react';

import Page from '@cda/ui/layout/Page';
import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import type { Site } from '@cda/services/sites';

import { useSites, generateDefaultSite } from '@cda/common/Sites';

import { release } from '@/services/core';

import ThemeForm from './components/ThemeForm/ThemeForm';
import InformationForm from './components/InformationForm';
import SocialForm from './components/SocialForm';

export default function Site() {
    const defaultSite = generateDefaultSite('', '');

    const { userSites } = useSites();

    const refInfo = useRef<null | HTMLDivElement>(null);
    const refTheme = useRef<null | HTMLDivElement>(null);
    const refSocial = useRef<null | HTMLDivElement>(null);

    const currentSite = useMemo(() => userSites.find(u => u.slug === userSites[0].slug), [userSites]);

    const goTo = (type: 'info' | 'theme' | 'social') => {
        if (type === 'info') { refInfo.current?.scrollIntoView({ behavior: 'smooth' }); }
        if (type === 'theme') { refTheme.current?.scrollIntoView({ behavior: 'smooth' }); }
        if (type === 'social') { refSocial.current?.scrollIntoView({ behavior: 'smooth' }); }
    };

    return (
        <Page title="Configurações do site" release={release}>
            <Stack>
                <Grid style={{ position: 'relative' }}>
                    <GridItem xl={10} lg={8} md={8} sm={12}>
                        <Stack>
                            <Slide enter delay={250}>
                                <InformationForm
                                    ref={refInfo}
                                    site={currentSite}
                                    defaultSite={defaultSite}
                                />
                            </Slide>
                            <Slide enter delay={250} direction="right">
                                <ThemeForm
                                    ref={refTheme}
                                    site={currentSite}
                                    defaultSite={defaultSite}
                                />
                            </Slide>
                            <Slide enter delay={250}>
                                <SocialForm
                                    ref={refSocial}
                                    site={currentSite}
                                    defaultSite={defaultSite}
                                />
                            </Slide>
                        </Stack>
                    </GridItem>
                    <GridItem xl={2} lg={4} md={4} sm={12}>
                        <Button
                            fullWidth
                            size="small"
                            color="info"
                            variant="text"
                            textAlign="left"
                            onClick={() => goTo('info')}
                        >
                            Informações
                        </Button>
                        <Button
                            fullWidth
                            size="small"
                            color="info"
                            variant="text"
                            textAlign="left"
                            onClick={() => goTo('theme')}
                        >
                            Tema
                        </Button>
                        <Button
                            fullWidth
                            size="small"
                            color="info"
                            variant="text"
                            textAlign="left"
                            onClick={() => goTo('social')}
                        >
                            Redes sociais
                        </Button>
                    </GridItem>
                </Grid>
            </Stack>
        </Page>
    );
}