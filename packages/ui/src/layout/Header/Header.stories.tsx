import type { Meta, StoryObj } from '@storybook/react';

import { createTheme, useTheme, themeDefaultLight, themeDefaultDark } from '@/theme';

import Header from './Header';

const meta: Meta<typeof Header> = {
    title: 'layout/Header',
    component: Header,
};

export const Template: StoryObj<typeof Header> = {
    render: () => {
        const { theme, updateTheme } = useTheme();

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
            <Header
                user={{
                    name: 'John Doe',
                    email: 'john.doe@email.com',
                    picture: 'https://robohash.org/john-doe'
                }}
                onUpdateMode={toggleTheme}
                onProfile={() => console.log('Profile')}
                onStartGuide={() => console.log('Start guide')}
            />
        );
    }
};
export default meta;
