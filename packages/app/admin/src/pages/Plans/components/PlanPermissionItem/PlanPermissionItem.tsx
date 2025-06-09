import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';
import { MappedColors } from '@cda/ui/theme';

interface PlanPermissionItemProps {
    highlight?: boolean;
    message?: string;
}

export default function PlanPermissionItem({ message, highlight = false }: PlanPermissionItemProps) {
    const textColor: MappedColors = highlight ? 'primary.contrastText' : 'text.secondary';
    const iconColor: MappedColors = highlight ? 'primary.contrastText' : 'primary.main';

    return (
        <Stack
            spacing="small"
            orientation="row"
            alignItems="flex-start"
        >
            <Icon name="check" color={iconColor} />
            <Typography color={textColor} variant="body2">
                {message}
            </Typography>
        </Stack>
    );
}