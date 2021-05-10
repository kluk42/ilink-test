import {FC} from 'react';
import { WordFromBackend } from '../App/types';

type OwnProps = {
    words: WordFromBackend[];
};

export type Props = FC<OwnProps>;
