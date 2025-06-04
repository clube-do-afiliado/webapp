import type { Timestamp } from 'firebase/firestore';

export type SignatureStatus = 'active' | 'inactive' | 'expired';

export interface Signature {
    id: string;
    ownerId: string;
    updatedAt: Timestamp;
    expiresIn: Timestamp;
    status: SignatureStatus;
}