import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@cda/ui/components/Box';
import Icon from '@cda/ui/components/Icon';
import Slide from '@cda/ui/animations/Slide';
import Stack from '@cda/ui/components/Stack';
import Content from '@cda/ui/layout/Content';
import useResize from '@cda/ui/hooks/useResize';
import Loading from '@cda/ui/components/Loading';
import { Sidebar, SidebarButton } from '@cda/ui/layout/Sidebar';
import { Menu, MenuButton, useMenu } from '@cda/ui/components/Menu';
import { Header, ButtonProfile, ButtonGuide } from '@cda/ui/layout/Header';

import { useAuth } from '@cda/common/Auth';
import { AccessControl } from '@cda/common/AccessControl';

import { url } from '@/services/core';

interface LayoutProps { children: React.JSX.Element; }
export default function Layout({ children }: React.PropsWithChildren<LayoutProps>) {
    const navigate = useNavigate();

    const [open, el, toggle] = useMenu();

    const { user, logout } = useAuth();

    const [loading, setLoading] = useState(true);
    const [compact, setCompact] = useState(false);

    useResize({
        onXs: () => { setCompact(true); },
        onSm: () => { setCompact(true); },
        onMd: () => { setCompact(false); },
        onLg: () => { setCompact(false); },
        onXl: () => { setCompact(false); },
    });

    useEffect(() => { if (user) { setLoading(false); } }, [user]);

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
                    actions={
                        <ButtonGuide onStartGuide={console.log} />
                    }
                    buttonProfile={
                        <ButtonProfile
                            user={{
                                name: user?.name || '',
                                email: user?.email || '',
                                picture: user?.picture || '',
                            }}
                            onProfile={toggle}
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
                        color="error"
                        justifyContent="flex-start"
                        icon={<Icon color="error.main" name="signout" />}
                        onClick={handleLogout}
                    />
                </Menu>
            </Slide>
            <Stack orientation="row" nogap>
                <Slide enter direction="left" timeout={.3}>
                    <Sidebar
                        compact={compact}
                        upButtons={
                            <div>
                                <SidebarButton
                                    path="home"
                                    label="Início"
                                    icon={<Icon name="home" />}
                                    onClick={() => navigate('/home')}
                                />
                                <SidebarButton
                                    path="site"
                                    label="Meu site"
                                    icon={<Icon name="window" />}
                                    onClick={() => navigate('/site')}
                                />
                                <SidebarButton
                                    path="products"
                                    label="Produtos"
                                    icon={<Icon name="box" />}
                                    onClick={() => navigate('/products')}
                                />
                                <AccessControl
                                    permissions={['templates:*']}
                                    component={(allowed) => (
                                        allowed && <SidebarButton
                                            path="templates"
                                            label="Templates"
                                            icon={<Icon name="image" />}
                                            onClick={() => navigate('/templates')}
                                        />
                                    )}
                                />
                                <AccessControl
                                    permissions={['bio:*']}
                                    component={(allowed) => (
                                        allowed && <SidebarButton
                                            path="bio"
                                            label="Link na bio"
                                            icon={<Icon name="user-square" />}
                                            onClick={() => navigate('/bio')}
                                        />
                                    )}
                                />
                            </div>
                        }
                        downButtons={
                            <div>
                                <SidebarButton
                                    label="Configuração"
                                    icon={<Icon name="setting" />}
                                />
                                <SidebarButton
                                    label="Sair"
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