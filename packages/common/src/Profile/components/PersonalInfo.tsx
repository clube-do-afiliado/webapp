import Box from '@cda/ui/components/Box';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Avatar from '@cda/ui/components/Avatar';
import Typography from '@cda/ui/components/Typography';
import { getLinearGradient } from '@cda/ui/theme';
import { useModal } from '@cda/ui/components/Modal';

import { formatDate } from '@cda/toolkit/date';

import type Storage from '@cda/services/storage';
import type { UserData } from '@cda/services/user';

import EditProfileModal from './EditProfleModal';

interface PersonalInfoProps {
    user: UserData;
    storage: Storage;
    onUpdateUser: (user: UserData) => Promise<UserData>;
}

export default function PersonalInfo({ user, storage, onUpdateUser }: PersonalInfoProps) {
    const [open, toggle] = useModal();

    return (
        <>
            <Box
                style={{ height: 150 }}
                sx={{
                    p: 2,
                    background: ({ primary }) => getLinearGradient(primary.main),
                    borderRadius: ({ radius }) => radius
                }}
            />
            <Stack justifyContent="center" alignItems="center">
                <Avatar
                    src={user?.picture}
                    icon={<Icon name="camera" size="large" />}
                    style={{
                        marginTop: -42.5,
                        width: 85,
                        height: 85,
                    }}
                    sx={{
                        backgroundColor: ({ background }) => background.default
                    }}
                />
                <Stack spacing="small" alignItems="center">
                    <Typography noMargin color="text.secondary" variant="body2">
                        {user?.email}
                    </Typography>
                    {
                        user?.name && (
                            <Typography noMargin variant="h5">
                                {user?.name}
                            </Typography>
                        )
                    }
                    <Typography noMargin variant="body2" color="text.secondary">
                        Criado em: {
                            formatDate(user.createdAt.toDate(), {
                                separator: '/'
                            })
                        }
                    </Typography>
                </Stack>

                <Button
                    startIcon={<Icon name="edit" />}
                    onClick={toggle}
                >
                    Editar
                </Button>
            </Stack>
            <EditProfileModal
                user={user}
                isOpen={open}
                storage={storage}
                onToggleModal={toggle}
                onUpdateUser={onUpdateUser}
            />
        </>
    );
}