import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import Button from '@/components/Button';

import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'components/Tooltip',
    component: Tooltip,
};

export const template: StoryObj<typeof Tooltip> = {
    render: () => {
        return (
            <>
                <Stack orientation="row" style={{ height: 350 }} alignItems="center">
                    <Tooltip label="Top" direction="top">
                        <Button>Top</Button>
                    </Tooltip>
                    <Tooltip label="Right" direction="right">
                        <Button>Right</Button>
                    </Tooltip>
                    <Tooltip label="Bottom" direction="bottom">
                        <Button>Bottom</Button>
                    </Tooltip>
                    <Tooltip label="Left" direction="left">
                        <Button>Left</Button>
                    </Tooltip>
                </Stack>
            </>
        );
    }
};

export default meta;