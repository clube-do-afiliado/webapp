'use client';

import Box from '@cda/ui/components/Box';

import Hero from '@/components/Hero';
import LeadBox from '@/components/LeadBox';
import Benefits from '@/components/Benefits';
import Integrations from '@/components/Integrations';
import Demonstration from '@/components/Demonstration';

export default function HomePage() {
    return (
        <Box tag="main">
            <Hero />
            <Benefits />
            <Demonstration />
            <Integrations />
            <LeadBox />
        </Box>
    );
}