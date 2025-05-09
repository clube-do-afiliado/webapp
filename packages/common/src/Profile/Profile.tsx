import Page from '@cda/ui/layout/Page';
import Box from '@cda/ui/components/Box';
import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Button from '@cda/ui/components/Button';
import Avatar from '@cda/ui/components/Avatar';
import Typography from '@cda/ui/components/Typography';
import { getLinearGradient } from '@cda/ui/theme';
import { useModal } from '@cda/ui/components/Modal';

import Storage from '@cda/services/storage';
import { UserData } from '@cda/services/user';

import { useAuth } from '../Auth';
import EditProfileModal from './components/EditProfleModal';

interface ProfileProps {
    storage: Storage;
    onUpdateUser: (user: UserData) => Promise<UserData>;
}

export default function Profile({ storage, onUpdateUser }: ProfileProps) {
    const [open, toggle] = useModal();

    const { user } = useAuth();

    return (
        <Page>
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
                <div style={{ textAlign: 'center' }}>
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
                        Criado em: 2025
                    </Typography>
                </div>

                <Button
                    variant="outlined"
                    startIcon={<Icon name="edit" />}
                    onClick={toggle}
                >
                    Editar
                </Button>
            </Stack>
            {
                user && (
                    <EditProfileModal
                        user={user}
                        isOpen={open}
                        storage={storage}
                        onUpdateUser={onUpdateUser}
                        onToggleModal={toggle}
                    />
                )
            }
        </Page>
    );
}