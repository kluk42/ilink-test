import {FC} from 'react';
import { WordToRender } from '../App/types';

type OwnProps = {
    words: WordToRender[];
};

export type Props = FC<OwnProps>;
