import {FC} from 'react';

export type StyleProps = {
    active: boolean;
    isWrong: boolean;
}

type OwnProps = {
    isWrong: boolean;
    handleClick: () => void;
    isDisabled: boolean;
};

export type Props = FC<OwnProps>;
