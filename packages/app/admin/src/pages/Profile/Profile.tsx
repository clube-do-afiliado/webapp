import Stack from '@cda/ui/components/Stack';
import Slide from '@cda/ui/animations/Slide';

import { useAuth } from '@cda/common/Auth';
import { useSignatures } from '@cda/common/Signatures';

import { storage } from '@/services/core';

import PlanInfo from './components/PlanInfo';
import PersonalInfo from './components/PersonalInfo';
import SecurityInfo from './components/SecurityInfo';

export default function Profile() {
    const { user } = useAuth();
    const { signature } = useSignatures();

    if (!user || !signature) { return; }

    return (
        <Slide enter direction="top">
            <Stack sx={{ mb: 3 }}>
                <Slide enter direction="left">
                    <PersonalInfo
                        user={user}
                        storage={storage}
                    />
                </Slide>
                <Slide enter direction="right" delay={300}>
                    <PlanInfo
                        user={user}
                        signature={signature}
                    />
                </Slide>
                <Slide enter direction="left" delay={300}>
                    <SecurityInfo user={user} />
                </Slide>
            </Stack>
        </Slide>
    );
}