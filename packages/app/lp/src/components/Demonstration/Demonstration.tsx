import dynamic from 'next/dynamic';

import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';
import Container from '@cda/ui/components/Container';

const YoutubeEmbed = dynamic(() => import('../YoutubeEmbed'), {
    ssr: false,
});

export default function Benefits() {
    return (
        <Stack
            tag="section"
            sx={{
                py: 8,
                background: ({ primary }) => primary.main
            }}
        >
            <Stack nogap justifyContent="center" alignItems="center" textAlign="center">
                <Typography
                    noMargin
                    variant="subtitle1"
                    color="primary.contrastText"
                    style={{ textTransform: 'uppercase' }}
                >
                    Demonstração
                </Typography>
                <Typography noMargin variant="h4" weight="bold" color="secondary.main">
                    Veja o Clube do afiliado em ação
                </Typography>
                <Typography
                    noMargin
                    variant="h6"
                    color="primary.contrastText"
                    style={{ maxWidth: '42rem' }}
                >
                    Uma prévia das principais funcionalidades da nossa plataforma.
                </Typography>
            </Stack>
            <Container justifyContent="center" alignItems="center">
                <YoutubeEmbed videoId="dQw4w9WgXcQ" title="Vídeo de apresentação" />
            </Container>
        </Stack>
    );
}