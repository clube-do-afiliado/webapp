import Image from 'next/image';

import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';
import { Grid, GridItem } from '@cda/ui/components/Grid';

import './Integrations.scss';

export default function Testimonials() {
    return (
        <Stack
            tag="section"
            spacing="large"
            sx={{
                p: 8,
                backgroundColor: ({ background }) => background.paper
            }}
        >
            <Stack nogap justifyContent="center" alignItems="center" textAlign="center">
                <Typography
                    noMargin
                    variant="subtitle1"
                    color="text.primary"
                    style={{ textTransform: 'uppercase' }}
                >
                    Integrações
                </Typography>
                <Typography
                    noMargin
                    variant="h4"
                    weight="bold"
                    color="primary.main"
                >
                    Nossas integrações
                </Typography>
                <Typography
                    noMargin
                    variant="h6"
                    color="text.secondary"
                    style={{ maxWidth: '50rem' }}
                >
                    Temos integração com os maiores programas de afiliado
                </Typography>
            </Stack>
            <Stack justifyContent="center" alignItems="center" style={{ margin: 'auto', maxWidth: 750 }}>
                <Grid xl={3} lg={3} md={3} sm={6} alignItems="center" className="integration-grid">
                    <GridItem>
                        <Image
                            src="http://cdn.clubedoafiliado.com/assets/images/amazon.svg"
                            loading="lazy"
                            alt="amazon"
                            width={375}
                            height={95}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <Image
                            src="http://cdn.clubedoafiliado.com/assets/images/magalu.svg"
                            loading="lazy"
                            alt="magalu"
                            width={375}
                            height={95}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </GridItem>
                    <GridItem>
                        <Image
                            src="http://cdn.clubedoafiliado.com/assets/images/shopee.svg"
                            loading="lazy"
                            alt="shopee"
                            width={375}
                            height={95}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </GridItem>
                    <GridItem sx={{ color: ({ primary }) => primary.main }}>
                        <Image
                            src="http://cdn.clubedoafiliado.com/assets/images/mercado-livre.svg"
                            loading="lazy"
                            alt="mercado livre"
                            width={375}
                            height={95}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </GridItem>
                </Grid>
            </Stack>
        </Stack>
    );
}