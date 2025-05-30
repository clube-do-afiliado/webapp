
import { useState } from 'react';

import Image from 'next/image';

import Box from '@cda/ui/components/Box';
import Button from '@cda/ui/components/Button';
import useResize from '@cda/ui/hooks/useResize';
import Typography from '@cda/ui/components/Typography';
import Stack, { type Orientation } from '@cda/ui/components/Stack';

import './Hero.scss';

export default function Hero() {
    const [orientation, setOrientation] = useState<Orientation>('row');

    useResize({
        onXs: () => { setOrientation('column'); },
        onSm: () => { setOrientation('row'); },
        onMd: () => { setOrientation('row'); },
        onLg: () => { setOrientation('row'); },
        onXl: () => { setOrientation('row'); },
    });

    return (
        <Stack textAlign="center" sx={{ my: 4, px: 4 }} className="hero">
            <Stack nogap textAlign="center" justifyContent="center" alignItems="center">
                <Typography noMargin variant="h2" weight="bold" style={{ fontWeight: 700 }}>
                    Monetize Seu Tráfego
                </Typography>
                <Typography noMargin variant="h2" weight="bold" color="primary.main" style={{ fontWeight: 700 }}>
                    Como Afiliado Profissional
                </Typography>
                <div style={{ maxWidth: '48rem' }}>
                    <Typography
                        noMargin
                        variant="h6"
                        textAlign="center"
                        color="text.secondary"
                        style={{ fontWeight: 500 }}
                    >
                        A plataforma definitiva para gerenciar, rastrear e otimizar seus produtos de afiliados.
                        Aumente suas conversões com nossas ferramentas inteligentes.
                    </Typography>
                </div>
            </Stack>

            <Stack
                spacing="small"
                alignItems="center"
                justifyContent="center"
                orientation={orientation}
            >
                <Button
                    size="large"
                    fullWidth={orientation === 'column'}
                    style={{ fontSize: 18, minHeight: 62, padding: '16px 40px' }}
                >
                    Comece grátis
                </Button>
                <Button
                    size="large"
                    variant="outlined"
                    fullWidth={orientation === 'column'}
                    style={{ fontSize: 18, minHeight: 62, padding: '16px 40px' }}
                >
                    Saiba mais
                </Button>
            </Stack>

            <Box className="hero__image-container" sx={{ mt: 2 }}>
                <div className="hero__image-content">
                    <Image
                        priority
                        // eslint-disable-next-line
                        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                        alt="Descrição da imagem"
                        width={1920}
                        height={1080}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </div>
            </Box>
        </Stack>
    );
}