import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';
import Icon from '@cda/ui/components/Icon';
import Tooltip from '@cda/ui/components/Tooltip';

interface AnalyticCardProps {
    title: string;
    value: number;
    tooltipLabel: string;
    icon: React.JSX.Element;
}

export default function AnalyticCard({ title, value, tooltipLabel, icon }: AnalyticCardProps) {
    return (
        <Card style={{ height: '100%' }}>
            <CardContent>
                <Stack orientation="row" alignItems="center" justifyContent="space-between">
                    <Stack orientation="row" alignItems="center">
                        <Avatar icon={icon} />
                        <Stack nogap>
                            <Typography noMargin variant="h5">
                                {value}
                            </Typography>
                            <Typography
                                noMargin
                                variant="body2"
                                color="text.secondary"
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {title}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Tooltip label={tooltipLabel}>
                        <Icon name="info-circle" color="text.secondary" />
                    </Tooltip>
                </Stack>
            </CardContent>
        </Card>
    );
}