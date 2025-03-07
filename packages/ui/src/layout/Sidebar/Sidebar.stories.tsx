import { Meta, StoryObj } from '@storybook/react';

import Icon from '@/components/Icon';

import Sidebar from './Sidebar';
import SidebarButton from './SidebarButton';

const meta: Meta<typeof Sidebar> = {
    title: 'layout/Sidebar',
    component: Sidebar,
};

export const template: StoryObj<typeof Sidebar> = {
    render: () => {
        return (
            <Sidebar
                upButtons={
                    <>
                        <SidebarButton path="iframe.html" icon={<Icon name="home" />} />
                        <SidebarButton icon={<Icon name="users-alt" />} />
                        <SidebarButton icon={<Icon name="bitcoin-circle" />} />
                    </>
                }
                downButtons={
                    <>
                        <SidebarButton icon={<Icon name="setting" />} />
                        <SidebarButton icon={<Icon name="signout" />} />
                    </>
                }
            />
        );
    }
};

export default meta;