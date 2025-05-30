import Box from '@cda/ui/components/Box';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Divider from '@cda/ui/components/Divider';
import Typography from '@cda/ui/components/Typography';

export default function Footer() {
    return (
        <Box
            tag="footer"
            alignItems="center"
            sx={{
                p: 3,
                backgroundColor: ({ text }) => text.primary
            }}
        >
            <Stack spacing="small" alignItems="center">
                <Typography noMargin color="text.disabled" textAlign="center">
                    © 2025 Clube do afiliado. Todos os direitos reservados.
                </Typography>
                <Divider sx={{ backgroundColor: ({ text }) => text.secondary }} />
                <Typography noMargin variant="body2" color="text.disabled" textAlign="center">
                    A plataforma definitiva para afiliados que querem escalar seus resultados
                    com automação e inteligência.
                </Typography>
                <Stack orientation="row" spacing="small" justifyContent="center">
                    <Avatar
                        icon={<Icon name="youtube" color="text.disabled" />}
                        onClick={console.log}
                    />
                    <Avatar
                        icon={<Icon name="instagram" color="text.disabled" />}
                        onClick={console.log}
                    />
                    <Avatar
                        icon={<Icon name="linkedin" color="text.disabled" />}
                        onClick={console.log}
                    />
                </Stack>
            </Stack>
        </Box>
    );
}