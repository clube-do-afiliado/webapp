import { cloneElement, HtmlHTMLAttributes, useMemo, useState } from 'react';

import { uuid } from '@cda/toolkit/uuid';

import { useTheme } from '../../theme';
import { joinClass } from '../../utils';

import './Tooltip.scss';

type TooltipCoordinate = { top?: number; left?: number; };
type Direction = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps { children: React.JSX.Element; direction?: Direction; label: string; }
export default function Tooltip({ children, label, direction = 'bottom' }: TooltipProps) {
    const { theme: { spacing } } = useTheme();
    const [open, setOpen] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [coordinate, setCoordinate] = useState<TooltipCoordinate | null>(null);

    const id = useMemo(() => `tooltip-${uuid()}`, []);

    const className = joinClass([
        'ui-tooltip',
        animate && 'ui-tooltip--visible',
    ]);

    const changePosition = (target: HTMLElement) => {
        const { offsetHeight, offsetWidth } = target;

        const { top, left } = target.getBoundingClientRect();

        const element = document.querySelector(`#${id}`) as HTMLElement;

        const { offsetHeight: elementOffsetHeight, offsetWidth: elementOffsetWidth } = element;

        if (direction === 'top') {
            const t = top - elementOffsetHeight - spacing;
            const l = left - (elementOffsetWidth / 2) + (offsetWidth / 2);

            setCoordinate({ top: t, left: l });
        }

        if (direction === 'bottom') {
            const t = top + offsetHeight + spacing;
            const l = left - (elementOffsetWidth / 2) + (offsetWidth / 2);

            setCoordinate({ top: t, left: l });
        }

        if (direction === 'right') {
            const t = top - (elementOffsetHeight / 2) + (offsetHeight / 2);
            const l = left + offsetWidth + spacing;

            setCoordinate({ top: t, left: l });
        }

        if (direction === 'left') {
            const t = top - (elementOffsetHeight / 2) + (offsetHeight / 2);
            const l = left - elementOffsetWidth - spacing;

            setCoordinate({ top: t, left: l });
        }
    };

    const renderChildren = () => {
        return cloneElement<HtmlHTMLAttributes<HTMLDivElement>>(children, {
            onMouseEnter: (e) => {
                setOpen(true);

                setTimeout(() => {
                    changePosition(e.target as HTMLElement);
                    setAnimate(true);
                }, 10);
            },
            onMouseLeave: () => {
                setAnimate(false);

                setTimeout(() => {
                    setCoordinate(null);
                    setOpen(false);
                }, 300);
            }
        });
    };

    return (
        <>
            {renderChildren()}
            <span id={id} className={className} style={{
                ...coordinate,
                display: open ? 'block' : 'none',
            }}>
                {label}
            </span>
        </>
    );
};