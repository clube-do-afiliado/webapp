import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Skeleton from '@cda/ui/components/Skeleton';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent } from '@cda/ui/components/Card';

interface AnalyticCardProps {
    title: string;
    value: number;
    loading: boolean;
    icon: React.JSX.Element;
    tooltip: React.JSX.Element;
}

export default function AnalyticCard({ title, value, tooltip, loading, icon }: AnalyticCardProps) {
    return (
        <>
            {
                !loading && (
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
                                {tooltip}
                            </Stack>
                        </CardContent>
                    </Card>
                )
            }
            {loading && <Skeleton variant="rounded" width="100%" height={88} />}
        </>
    );
}