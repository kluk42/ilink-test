import {FC} from 'react';
import { WordFromBackend } from '../App/types';

type OwnProps = {
    word: WordFromBackend;
    index: number;
    isInCollection?: boolean;
};

export type Props = FC<OwnProps>;
