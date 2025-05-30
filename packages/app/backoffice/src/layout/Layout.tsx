import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@cda/ui/components/Box';
import Icon from '@cda/ui/components/Icon';
import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';
import Content from '@cda/ui/layout/Content';
import Loading from '@cda/ui/components/Loading';
import Tooltip from '@cda/ui/components/Tooltip';
import { Menu, MenuButton, useMenu } from '@cda/ui/components';
import { Sidebar, SidebarButton } from '@cda/ui/layout/Sidebar';
import { Header, ButtonMode, ButtonProfile } from '@cda/ui/layout/Header';
import { createTheme, useTheme, themeDefaultLight, themeDefaultDark } from '@cda/ui/theme';

import { useAuth } from '@cda/common/Auth';

import { url } from '@/services/core';

interface LayoutProps { children: React.JSX.Element; }
export default function Layout({ children }: React.PropsWithChildren<LayoutProps>) {
    const navigate = useNavigate();

    const [open, el, toggle] = useMenu();
    const { theme, updateTheme } = useTheme();

    const { user, logout } = useAuth();

    const [loading, setLoading] = useState(true);

    const themes = {
        light: themeDefaultLight,
        dark: themeDefaultDark,
    };

    useEffect(() => {
        if (user) { setLoading(false); }
    }, [user]);

    const toggleTheme = () => {
        updateTheme(createTheme(theme.palette.mode === 'dark'
            ? themes.light
            : themes.dark
        ));
    };

    const goToByMenu = () => {
        navigate('/profile');
        toggle();
    };

    const handleLogout = async () => {
        return logout()
            .then(() => window.open(url.sso, '_self'));
    };

    return (
        <Box sx={{ backgroundColor: ({ background }) => background.default }}>
            <Slide enter direction="top" timeout={.3}>
                <Header
                    actions={<ButtonMode onUpdateMode={toggleTheme} />}
                    buttonProfile={
                        <ButtonProfile
                            user={{
                                name: user?.name || '',
                                email: user?.email || '',
                                picture: user?.picture || '',
                            }}
                            onProfile={handleLogout}
                        />
                    }
                />
                <Menu
                    open={open}
                    anchorEl={el}
                    onClose={toggle}
                    direction="right"
                    width="fit-content"
                >
                    <MenuButton
                        justifyContent="flex-start"
                        label="Minha conta"
                        icon={<Icon name="user" />}
                        onClick={goToByMenu}
                    />
                    <MenuButton
                        label="Sair"
                        justifyContent="flex-start"
                        color="error"
                        icon={<Icon color="error.main" name="signout" />}
                        onClick={logout}
                    />
                </Menu>
            </Slide>
            <Stack orientation="row" nogap>
                <Slide enter direction="left" timeout={.3}>
                    <Sidebar
                        compact
                        upButtons={
                            <div>
                                <Tooltip label="Usuários" direction="right">
                                    <SidebarButton
                                        path="users"
                                        icon={<Icon name="users-alt" />}
                                        onClick={() => navigate('/users')}
                                    />
                                </Tooltip>
                                <Tooltip label="Lojas" direction="right">
                                    <SidebarButton
                                        path="stores"
                                        icon={<Icon name="store-alt" />}
                                        onClick={() => navigate('/stores')}
                                    />
                                </Tooltip>
                                <Tooltip label="Integrações" direction="right">
                                    <SidebarButton
                                        path="integrations"
                                        icon={<Icon name="channel" />}
                                        onClick={() => navigate('/integrations')}
                                    />
                                </Tooltip>
                                <Tooltip label="Roles" direction="right">
                                    <SidebarButton
                                        path="roles"
                                        icon={<Icon name="constructor" />}
                                        onClick={() => navigate('/roles')}
                                    />
                                </Tooltip>
                                <Tooltip label="Planos" direction="right">
                                    <SidebarButton
                                        path="plans"
                                        icon={<Icon name="file-check-alt" />}
                                        onClick={() => navigate('/plans')}
                                    />
                                </Tooltip>
                            </div>
                        }
                        downButtons={
                            <div>
                                <SidebarButton
                                    icon={<Icon name="setting" />}
                                />
                                <SidebarButton
                                    icon={<Icon name="signout" />}
                                    onClick={logout}
                                />
                            </div>
                        }
                    />
                </Slide>
                <Content>
                    {
                        loading
                            ? (
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    style={{ height: 300 }}
                                >
                                    <Loading size={70} />
                                </Stack>
                            )
                            : children
                    }
                </Content>
            </Stack>
        </Box>
    );
}