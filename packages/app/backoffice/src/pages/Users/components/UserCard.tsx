import type { CSSProperties } from 'react';

import Chip from '@cda/ui/components/Chip';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import Typography from '@cda/ui/components/Typography';
import { Card, CardContent, } from '@cda/ui/components/Card';

import type { UserData } from '@cda/services/user';

const TEXT_OVERFLOW: CSSProperties = {
    maxWidth: '160px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

interface UserCardProps { user: UserData; onClick: (user: UserData) => void; }
export default function UserCard({ user, onClick }: UserCardProps) {
    const isActive = user.status === 'active';

    const handleClick = () => { onClick(user); };

    return (
        <Card onClick={handleClick}>
            <CardContent>
                <Stack orientation="row" alignItems="center" justifyContent="flex-start">
                    <Stack spacing="medium" orientation="row" alignItems="center">
                        <Avatar
                            src={user.picture}
                            name={user.name}
                            sx={{
                                color: ({ text }) => text.secondary,
                                backgroundColor: ({ background }) => background.default
                            }}
                        />
                        <div>
                            <Typography noMargin style={TEXT_OVERFLOW}>{user.name}</Typography>
                            <Typography noMargin variant="body2" color="text.secondary" style={TEXT_OVERFLOW}>
                                {user.email}
                            </Typography>
                        </div>
                    </Stack>
                    <Chip label={user.status} size="small" color={isActive ? 'success' : 'error'} />
                </Stack>
            </CardContent>
        </Card>
    );
}