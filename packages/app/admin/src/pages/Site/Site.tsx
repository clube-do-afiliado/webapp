import { Outlet, useNavigate, generatePath } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';

import Page from '@cda/ui/layout/Page';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Select, Option } from '@cda/ui/components/Select';
import Popover from '@cda/ui/components/Popover';

import type { Site } from '@cda/services/sites';

import { useSites } from '@cda/common/Sites';
import { AccessControl } from '@cda/common/AccessControl';

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setSelectedSiteSlug(e.target.value); };

    return (
        <Page title="Configurações do site" release={release}>
            <Stack>
                <Grid xl={3} lg={4} md={6} sm={12}>
                    <GridItem>
                        <AccessControl
                            permissions={[
                                'store:self:multiple:2',
                                'store:self:multiple:2',
                                'store:self:multiple:5'
                            ]}
                            component={(allowed) => (
                                <Stack orientation="row" alignItems="center">
                                    <Select
                                        fullWidth
                                        disabled={!allowed}
                                        placeholder="Selecione um valor"
                                        startIcon={
                                            <Icon name="store" color="text.secondary" />
                                        }
                                        value={selectedSiteSlug}
                                        onChange={handleChange}
                                    >
                                        {
                                            userSites.map(site => (
                                                <Option key={site.slug} value={site.slug}>{site.name}</Option>
                                            ))
                                        }
                                    </Select>
                                    <Popover
                                        label={
                                            <span>
                                                {/* TODO: ADICIONAR URL DOS PLANOS */}
                                                Para habilitar novas lojas consulte o <a href="">catálogo de planos</a>
                                            </span>
                                        }
                                        direction="right"
                                    >
                                        <Icon name="info-circle" color="text.secondary" />
                                    </Popover>
                                </Stack>
                            )}
                        />
                    </GridItem>
                </Grid>
                <Outlet />
            </Stack>
        </Page>
    );
}