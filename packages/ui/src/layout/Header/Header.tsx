import type { HTMLAttributes } from 'react';

import { joinClass } from '../../utils';
import Logo from '../../components/Logo';
import Stack from '../../components/Stack';

import './Header.scss';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    buttonMode?: React.JSX.Element;
    buttonGuide?: React.JSX.Element;
    buttonProfile?: React.JSX.Element;
}
export default function Header({
    buttonMode,
    buttonGuide,
    buttonProfile,
    ...props
}: HeaderProps) {
    return (
        <div className={joinClass(['ui-header', props.className])} {...props}>
            <div className="ui-header__logo">
                <button>
                    <Logo width={75} />
                </button>
            </div>

            {
                (
                    buttonGuide || buttonMode || buttonProfile) && (
                    <Stack orientation="row" justifyContent="flex-end" alignItems="center">
                        {buttonGuide}
                        {buttonMode}
                        {buttonProfile}
                    </Stack>
                )
            }
        </div>
    );
}