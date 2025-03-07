import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { getRandom } from '@cda/toolkit/array';

import Stack from '@/components/Stack';
import Button from '@/components/Button';

import Donut from './Donut';
import type { ChartData } from '../interface';

const meta: Meta<typeof Donut> = {
    title: 'Charts/Donut',
    component: Donut,
};

const VALUES = [900, 100, 300, 500];

const DATA: ChartData[] = [
    { label: 'label a', value: VALUES[0], color: 'error.main' },
    { label: 'label b', value: VALUES[1] },
    { label: 'label c', value: VALUES[2] },
    { label: 'label d', value: VALUES[3] },
];

export const Template: StoryObj<typeof Donut> = {
    render: () => {
        const [data, setData] = useState(DATA);

        const randomize = () => {
            setData(data.map(d => ({ ...d, value: getRandom(VALUES) })));
        };

        return (
            <Stack>
                <Button onClick={randomize}>Random</Button>
                <Donut data={data} tooltipPosition="left" />
            </Stack>
        );
    }
};

export const Empty: StoryObj<typeof Donut> = {
    render: () => {
        return (
            <Stack>
                <Donut data={[]} />
            </Stack>
        );
    }
};

export default meta;