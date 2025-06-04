import copy from 'copy-to-clipboard';

import Icon from '@cda/ui/components/Icon';
import Chip from '@cda/ui/components/Chip';
import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';
import Avatar from '@cda/ui/components/Avatar';
import ButtonIcon from '@cda/ui/components/ButtonIcon';
import { TableCell } from '@cda/ui/components/Table';
import { useAlert } from '@cda/ui/components';

import type { UserData } from '@cda/services/user';

interface UserRowProps {
    user: UserData;
    index: number;
    onView: (user: UserData) => void;
}

export default function UserRow({ user, index, onView }: UserRowProps) {
    const { addAlert } = useAlert();

    const handleCopyId = () => {
        copy(user.id);
        addAlert({ message: 'Id copiado', color: 'success', icon: <Icon name="check" /> });
    };

    const handleEditUser = () => { onView(user); };

    return (
        <Slide
            enter
            key={user.id}
            tag="tr"
            direction="left"
            delay={(index + 1) * 100}
        >
            <TableCell>
                <Stack orientation="row" spacing="small" alignItems="center ">
                    <ButtonIcon color="text.secondary" onClick={handleCopyId}>
                        <Icon name="copy" />
                    </ButtonIcon>
                    {[user.id.slice(0, 10), '...'].join('') || '-'}
                </Stack>
            </TableCell>
            <TableCell>
                <Stack orientation="row" spacing="small" alignItems="center ">
                    <Avatar src={user.picture} />
                    {user.name}
                </Stack>
            </TableCell>
            <TableCell>{user.email || '-'}</TableCell>
            <TableCell>
                <Stack orientation="row" spacing="small">
                    {
                        user.roles.map(role => (
                            <Chip
                                key={role}
                                label={role}
                                icon={<Icon name="shield" />}
                            />
                        ))
                    }
                </Stack>
            </TableCell>
            <TableCell align="center">
                <ButtonIcon onClick={handleEditUser}>
                    <Icon name="eye" />
                </ButtonIcon>
            </TableCell>
        </Slide>
    );
}