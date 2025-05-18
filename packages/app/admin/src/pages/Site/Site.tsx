import { useMemo, useRef } from 'react';

import Page from '@cda/ui/layout/Page';
import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';

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

    return (
        <Page title="Configurações do site" release={release}>
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
        </Page>
    );
}