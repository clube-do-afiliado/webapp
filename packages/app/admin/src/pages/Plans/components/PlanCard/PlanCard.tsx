import Stack from '@cda/ui/components/Stack';
import Typography from '@cda/ui/components/Typography';
import type { MappedColors } from '@cda/ui/theme';
import { Card, CardContent } from '@cda/ui/components/Card';

interface PlanCardProps {
    name: string;
    highlight?: boolean;
    description: string;
    chip: React.JSX.Element;
    value: React.JSX.Element;
    button: React.JSX.Element;
    permissions: React.ReactNode;
}

export default function PlanCard({
    name,
    value,
    description,
    highlight = false,
    chip,
    button,
    permissions,
}: PlanCardProps) {
    const textColor: MappedColors = highlight ? 'primary.contrastText' : 'text.secondary';

    return (
        <Card
            sx={
                highlight ? { background: ({ primary }) => primary.main } : {}
            }
            style={{ height: '100%' }}
        >
            <CardContent style={{ height: '100%' }}>
                <Stack justifyContent="space-between" style={{ height: '100%' }}>
                    <Stack>
                        <Stack orientation="row" alignItems="center">
                            <Typography
                                variant="h6"
                                color={textColor}
                            >
                                {name}
                            </Typography>
                            {chip}
                        </Stack>
                        <Typography color={textColor} variant="body2">
                            {description}
                        </Typography>
                        {value}
                        <Stack spacing="small">
                            {permissions}
                        </Stack>
                    </Stack>
                    {button}
                </Stack>
            </CardContent>
        </Card>
    );
}