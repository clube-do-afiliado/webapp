import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';

interface EmptyContentProps {
    icon?: string;
    message: string;
    image?: 'ghost' | 'box' | 'search' | 'chart';
}
export default function EmptyContent({ icon, image, message }: EmptyContentProps) {
    return (
        <Stack alignItems="center">
            {icon && <Icon name={icon} color="text.secondary" style={{ fontSize: 72 }} />}
            {
                image && (
                    <img
                        loading="eager"
                        src={`https://cdn.clubedoafiliado.com/assets/images/empty-${image}.svg`}
                        style={{ width: 300 }}
                    />
                )
            }
            <Typography noMargin variant="h6" color="text.secondary" style={{ textAlign: 'center' }}>
                {message}
            </Typography>
        </Stack>
    );
}