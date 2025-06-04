import { useMemo } from 'react';

import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Icon from '@cda/ui/components/Icon';
import { useModal } from '@cda/ui/components/Modal';

import type { Site } from '@cda/services/sites';

import { useSites, generateDefaultSite } from '@cda/common/Sites';

import { release, url } from '@/services/core';
import AdminPage from '@/components/AdminPage';
import SharedModal from '@/components/SharedModal';

import SocialForm from './components/SocialForm';
import ThemeForm from './components/ThemeForm/ThemeForm';
import InformationForm from './components/InformationForm';

export default function Site() {
    const defaultSite = generateDefaultSite('', '');

    const [openSharedModal, toggleSharedModal] = useModal();

    const { userSites } = useSites();

    const currentSite = useMemo(() => userSites.find(u => u.slug === userSites[0].slug), [userSites]);

    const shortUrl = `${url.store}/${currentSite?.slug}/produtos`;

    return (
        <AdminPage
            title="Configurações do site"
            release={release}
            action={
                <Button
                    variant="outlined"
                    startIcon={<Icon name="share-alt" />}
                    onClick={toggleSharedModal}
                >
                    Compartilhar
                </Button>
            }
        >
            <Stack>
                <Slide enter delay={250}>
                    <InformationForm
                        site={currentSite}
                        defaultSite={defaultSite}
                    />
                </Slide>
                <Slide enter delay={250} direction="right">
                    <ThemeForm
                        site={currentSite}
                        defaultSite={defaultSite}
                    />
                </Slide>
                <Slide enter delay={250}>
                    <SocialForm
                        site={currentSite}
                        defaultSite={defaultSite}
                    />
                </Slide>
            </Stack>
            <SharedModal
                url={shortUrl}
                isOpen={openSharedModal}
                onToggleModal={toggleSharedModal}
            />
        </AdminPage>
    );
}