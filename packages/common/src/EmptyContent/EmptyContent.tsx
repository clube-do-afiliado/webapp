import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';

interface EmptyContentProps { icon: string; message: string; }
export default function EmptyContent({ icon, message }: EmptyContentProps) {
    return (
        <Stack alignItems="center">
            <Icon name={icon} color="text.secondary" style={{ fontSize: 72 }} />
            <Typography noMargin variant="h6" color="text.secondary" style={{ textAlign: 'center' }}>
                {message}
            </Typography>
        </Stack>
    );
}