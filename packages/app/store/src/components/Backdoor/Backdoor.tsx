'use client';

import { useState } from 'react';

import './Backdoor.scss';

interface BackdoorProps {
    onClick: () => void;
}

export default function Backdoor({ onClick }: BackdoorProps) {
    const [visible, setVisible] = useState(true);

    const handleClick = async () => {
        setVisible(false);

        onClick();
    };

    return (
        visible && (
            <div className="backdoor" onMouseDown={handleClick} />
        )
    );
}