import {FC} from 'react';
import { WordFromBackend } from '../App/types';

type Transform = {
    x: number,
    y: number,
    scaleX: number,
    scaleY: number
} | null;

export type WordContainerProps = {
    transform: Transform;
    isInCollection?: boolean;
    transition: string | null;
    isVisible?: boolean;
}

type OwnProps = {
    word: WordFromBackend;
    isInCollection?: boolean;
    isVisible?: boolean;
};

export type Props = FC<OwnProps>;
