import Stack from '@cda/ui/components/Stack';

import Storage from '@cda/services/storage';
import { UserData } from '@cda/services/user';

import { useAuth } from '../Auth';
import PlanInfo from './components/PlanInfo';
import PersonalInfo from './components/PersonalInfo';
import SecurityInfo from './components/SecurityInfo';
import { useSignatures } from '../Signatures';

interface ProfileProps {
    storage: Storage;
    onUpdateUser: (user: UserData) => Promise<UserData>;
}

export default function Profile({ storage, onUpdateUser }: ProfileProps) {
    const { user } = useAuth();
    const { signature } = useSignatures();

    if (!user || !signature) { return; }

    return (
        <Stack sx={{ mb: 3 }}>
            <PersonalInfo
                user={user}
                storage={storage}
                onUpdateUser={onUpdateUser}
            />
            <PlanInfo
                user={user}
                signature={signature}
            />
            <SecurityInfo user={user} />
        </Stack>
    );
}