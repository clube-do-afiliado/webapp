import Box from '@cda/ui/components/Box';
import Slide from '@cda/ui/animations/Slide';
import Content from '@cda/ui/layout/Content';
import { Header, ButtonMode, ButtonProfile } from '@cda/ui/layout/Header';
import { createTheme, useTheme, themeDefaultLight, themeDefaultDark } from '@cda/ui/theme';

import { useAuth } from '@cda/common/Auth';

interface LayoutProps { children: React.JSX.Element; }
export default function Layout({ children }: React.PropsWithChildren<LayoutProps>) {
    const { theme, updateTheme } = useTheme();

    const { user } = useAuth();

    const themes = {
        light: themeDefaultLight,
        dark: themeDefaultDark,
    };

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
                    buttonMode={
                        user && <ButtonMode onUpdateMode={toggleTheme} />
                    }
                    buttonProfile={
                        user && (
                            <ButtonProfile
                                user={{
                                    name: user?.name || '',
                                    email: user?.email || '',
                                    picture: user?.picture || '',
                                }}
                                onProfile={console.log}
                            />
                        )
                    }
                    style={{
                        justifyContent:
                            !user
                                ? 'center'
                                : 'space-between'
                    }}
                />
            </Slide>
            <Content fullwidth style={{ minHeight: 350 }}>
                {children}
            </Content>
        </Box>
    );
}