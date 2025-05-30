import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';
import { getOpacityColor } from '@cda/ui/theme/utils';

export default function FrequentlyAskedQuestions() {
    return (
        <Stack
            spacing="large"
            tag="section"
            sx={{
                p: 8,
                backgroundColor: ({ primary }) => getOpacityColor(primary.main, .15)
            }}
        >
            <Stack nogap justifyContent="center" alignItems="center" textAlign="center">
                <Typography noMargin variant="subtitle1" color="primary.main" style={{ textTransform: 'uppercase' }}>
                    Perguntas Frequentes
                </Typography>
                <Typography noMargin variant="h4" weight="bold">
                    Dúvidas Comuns
                </Typography>
                <Typography noMargin variant="h6" color="text.secondary" style={{ maxWidth: '42rem' }}>
                    Aqui estão as respostas para as perguntas que recebemos com mais frequência.
                </Typography>
            </Stack>
        </Stack>
    );
}