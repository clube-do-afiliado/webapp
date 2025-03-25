import { useEffect, useState } from 'react';
import { Outlet, useNavigate, generatePath } from 'react-router-dom';

import Page from '@cda/ui/layout/Page';
import Stack from '@cda/ui/components/Stack';

import type { Site } from '@cda/services/sites';

import { useSites } from '@cda/common/Sites';

import { release } from '@/services/core';

export default function Site() {
    const { userSites } = useSites();

    const navigate = useNavigate();

    const [selectedSiteSlug, setSelectedSiteSlug] = useState('');

    useEffect(() => {
        if (!selectedSiteSlug) { return; }

        navigate(generatePath('/site/:slug', { slug: selectedSiteSlug }));
    }, [selectedSiteSlug]);

    useEffect(() => {
        if (!userSites.length) { return; }

        setSelectedSiteSlug(userSites[0].slug);
    }, [userSites]);

    return (
        <Page title="Configurações do site" release={release}>
            <Stack>
                <Outlet />
            </Stack>
        </Page>
    );
}