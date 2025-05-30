import Page from '@cda/ui/layout/Page';
import { Grid, GridItem } from '@cda/ui/components/Grid';
import Button from '@cda/ui/components/Button';
import Icon from '@cda/ui/components/Icon';
import Slide from '@cda/ui/animations/Slide';

import { release } from '@/services/core';

import Preview from './components/Preview';
import BioForm from './components/BioForm';

export default function Site() {
    return (
        <Page
            title="Link na bio"
            release={release}
            action={
                <Button
                    variant="outlined"
                    startIcon={<Icon name="external-link-alt" />}
                >
                    Ver página
                </Button>
            }
        >
            <Grid>
                <GridItem xl={9} lg={8} md={7} sm={12}>
                    <Slide enter direction="left" delay={200}>
                        <BioForm />
                    </Slide>
                </GridItem>
                <GridItem xl={3} lg={4} md={5} sm={12} sx={{ mt: 4 }}>
                    <Slide enter direction="right" delay={200}>
                        <Preview />
                    </Slide>
                </GridItem>
            </Grid>
        </Page>
    );
}