'use client';

import { useState } from 'react';

import { trackImpression, TrackParams } from '@/services/trackService';

import './Backdoor.scss';

interface BackdoorProps {
    siteSlug: string;
    productSlug: string;
    url: string;
    params: TrackParams;
}

export default function Backdoor({ siteSlug, productSlug, params, url }: BackdoorProps) {
    const [visible, setVisible] = useState(true);

    const handleClick = async () => {
        setVisible(false);

        window.open(url, '_blank');

        await trackImpression(
            siteSlug,
            productSlug,
            params
        );
    };

    return (
        visible && (
            <div className="backdoor" onMouseDown={handleClick} />
        )
    );
}