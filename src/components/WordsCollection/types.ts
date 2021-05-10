import {FC} from 'react';
import { WordToPick } from '../App/types';

type OwnProps = {
    words: WordToPick[];
};

export type Props = FC<OwnProps>;
