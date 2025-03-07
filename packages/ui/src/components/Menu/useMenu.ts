import { useRef, useState } from 'react';

import useOutsideClick from '../../hooks/useOutsideClick';

type UseMenu = [
    boolean,
    HTMLElement | null,
    React.RefObject<HTMLDivElement | null>,
    (event?: React.MouseEvent<HTMLButtonElement>) => void,
];

export default function useMenu(): UseMenu {
    const ref = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    useOutsideClick(ref, () => handleClose(), []);

    const handleOpen = (event?: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event ? event.currentTarget : null);
    };

    const handleClose = () => { setAnchorEl(null); };

    const handleToggle = (event?: React.MouseEvent<HTMLButtonElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        open ? handleClose() : handleOpen(event);
    };

    return [open, anchorEl, ref, handleToggle];
}