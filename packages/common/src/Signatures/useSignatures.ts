import { useContext } from 'react';

import { SignaturesContext } from './SignaturesProvider';

export default function useSignatures() {
    return useContext(SignaturesContext);
}