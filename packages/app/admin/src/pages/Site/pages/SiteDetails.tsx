import { useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Stack from '@cda/ui/components/Stack';
import Slide from '@cda/ui/animations/Slide';
import Button from '@cda/ui/components/Button';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import { Form, FormControl, useForm } from '@cda/ui/components/Form';

import type { Site } from '@cda/services/sites';

import { useSites, generateDefaultSite } from '@cda/common/Sites';

import ThemeForm from '../components/ThemeForm';
import InformationForm from '../components/InformationForm';
import SocialForm from '../components/SocialForm';

export default function SitePage() {
    const defaultSite = generateDefaultSite('', '');

    const { slug } = useParams<{ slug: string; }>();

    const { userSites } = useSites();

    const refInfo = useRef<null | HTMLDivElement>(null);
    const refTheme = useRef<null | HTMLDivElement>(null);
    const refSocial = useRef<null | HTMLDivElement>(null);

    const currentSite = useMemo(() => userSites.find(u => u.slug === slug), [userSites]);

    const [formGroup] = useForm<Omit<Site, 'id' | 'slug' | 'ownerId'>>({
        form: {
            name: new FormControl({
                defaultValue: currentSite?.name || defaultSite.name,
                required: true
            }),
            information: new FormControl({
                defaultValue: currentSite?.information || defaultSite.information,
                required: true
            }),
            products: new FormControl({
                defaultValue: currentSite?.products || defaultSite.products,
                required: true
            }),
            socials: new FormControl({
                defaultValue: currentSite?.socials || defaultSite.socials,
                required: true
            }),
            theme: new FormControl({
                defaultValue: currentSite?.theme || defaultSite.theme,
                required: true
            }),
        },
        handle: {
            submit: (form) => {
                console.log(form.values);
            }
        }
    }, [currentSite]);

    const goTo = (type: 'info' | 'theme' | 'social') => {
        if (type === 'info') { refInfo.current?.scrollIntoView({ behavior: 'smooth' }); }
        if (type === 'theme') { refTheme.current?.scrollIntoView({ behavior: 'smooth' }); }
        if (type === 'social') { refSocial.current?.scrollIntoView({ behavior: 'smooth' }); }
    };

    return (
        <Grid style={{ position: 'relative' }}>
            <GridItem xl={10} lg={8} md={8} sm={12}>
                <Form formGroup={formGroup}>
                    <Stack>
                        <Slide enter delay={250}>
                            <InformationForm ref={refInfo} />
                        </Slide>
                        <Slide enter delay={250} direction="right">
                            <ThemeForm ref={refTheme} />
                        </Slide>
                        <Slide enter delay={250}>
                            <SocialForm ref={refSocial} />
                        </Slide>
                    </Stack>
                    <div style={{
                        position: 'fixed',
                        bottom: 30,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999
                    }}>
                        <Button color="secondary" type="submit">
                            Salvar configurações
                        </Button>
                    </div>
                </Form>
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
    );
}