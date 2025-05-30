import Box from '@cda/ui/components/Box';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';

export default function PlanItem() {
    return (
        <Stack orientation="row" alignItems="center" justifyContent="flex-start">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{ width: 22, height: 22 }}
                sx={{
                    background: ({ primary }) => primary.main,
                    borderRadius: ({ radius }) => radius
                }}
            >
                <Icon name="check" color="primary.contrastText" size="small" />
            </Box>
            <Typography noMargin>Links inteligentes ilimitados</Typography>
        </Stack>
    );
}