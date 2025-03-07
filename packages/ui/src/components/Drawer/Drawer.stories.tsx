import { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button';

import Drawer from './Drawer';
import useDrawer from './useDrawer';
import DrawerContent from './DrawerContent';

const meta: Meta<typeof Drawer> = {
    title: 'components/Drawer',
    component: Drawer,
};

export const WithOrientationRight: StoryObj<typeof Drawer> = {
    render: () => {
        const [open, toggle] = useDrawer();

        return (
            <div>
                <Button onClick={toggle}>Toggle Drawer</Button>
                <Drawer orientation="right" open={open} onClose={toggle}>
                    <DrawerContent>
                        AAAA
                    </DrawerContent>
                </Drawer>
            </div>
        );
    }
};

export const WithOrientationLeft: StoryObj<typeof Drawer> = {
    render: () => {
        const [open, toggle] = useDrawer();

        return (
            <div>
                <Button onClick={toggle}>Toggle Drawer</Button>
                <Drawer orientation="left" open={open} onClose={toggle}>
                    <DrawerContent>
                        AAAA
                    </DrawerContent>
                </Drawer>
            </div>
        );
    }
};

export const WithOrientationBottom: StoryObj<typeof Drawer> = {
    render: () => {
        const [open, toggle] = useDrawer();

        return (
            <div>
                <Button onClick={toggle}>Toggle Drawer</Button>
                <Drawer orientation="bottom" open={open} onClose={toggle}>
                    <DrawerContent>
                        AAAA
                    </DrawerContent>
                </Drawer>
            </div>
        );
    }
};

export default meta;
