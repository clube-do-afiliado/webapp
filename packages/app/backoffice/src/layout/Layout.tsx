import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@cda/ui/components/Box';
import Header from '@cda/ui/layout/Header';
import Icon from '@cda/ui/components/Icon';
import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';
import Content from '@cda/ui/layout/Content';
import Loading from '@cda/ui/components/Loading';
import { Sidebar, SidebarButton } from '@cda/ui/layout/Sidebar';
import { createTheme, useTheme, themeDefaultLight, themeDefaultDark } from '@cda/ui/theme';
import Tooltip from '@cda/ui/components/Tooltip';

import { useAuth } from '@cda/common/Auth';

interface LayoutProps { children: React.JSX.Element; }
export default function Layout({ children }: React.PropsWithChildren<LayoutProps>) {
    const navigate = useNavigate();
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

    return (
        <Box sx={{ backgroundColor: ({ background }) => background.default }}>
            <Slide enter direction="top" timeout={.3}>
                <Header
                    user={{
                        name: user?.name || '',
                        email: user?.email || '',
                        picture: user?.picture || '',
                    }}
                    onUpdateMode={toggleTheme}
                    onProfile={() => console.log('Profile')}
                />
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