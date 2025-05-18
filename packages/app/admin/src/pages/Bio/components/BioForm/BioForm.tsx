import Stack from '@cda/ui/components/Stack';

import BioLinksForm from './BioLinksForm';
import BioGeneralForm from './BioGeneralForm';

export default function BioForm() {
    return (
        <Stack>
            <BioGeneralForm />
            <BioLinksForm />
        </Stack>
    );
}