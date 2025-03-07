import { useTheme } from '../../theme';
import Icon from '../../components/Icon';
import Logo from '../../components/Logo';
import Stack from '../../components/Stack';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';
import ButtonIcon from '../../components/ButtonIcon';

import './Header.scss';

interface User {
    name: string;
    email: string;
    picture: string;
}

interface HeaderProps {
    user: User;
    onProfile: () => void;
    onUpdateMode: () => void;
    onStartGuide: () => void;
}
export default function Header({
    user,
    onProfile,
    onStartGuide,
    onUpdateMode,
}: HeaderProps) {
    const { theme } = useTheme();

    const { name, picture } = user;

    const modeIcon = theme.palette.mode === 'dark' ? 'moon' : 'sun';

    return (
        <div className="ui-header">
            <div className="ui-header__logo">
                <button>
                    <Logo width={150} />
                </button>
            </div>

            <Stack orientation="row" justifyContent="flex-end" alignItems="center">
                <Button
                    size="small"
                    variant="text"
                    startIcon={<Icon name="question-circle" />}
                    onClick={onStartGuide}
                >
                    Ajuda
                </Button>
                <ButtonIcon onClick={onUpdateMode}>
                    <Icon name={modeIcon} />
                </ButtonIcon>
                <Tooltip direction="bottom" label={name}>
                    <Avatar
                        alt={name}
                        name={name}
                        src={picture}
                        sx={{ backgroundColor: ({ secondary }) => secondary.main }}
                        onClick={onProfile}
                    />
                </Tooltip>
            </Stack>
        </div>
    );
}