import { useDroppable } from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable'

import {AnswerContainer} from './styles';

import { FieldNames } from '../App/types';
import {Props} from './types';

import Word from '../Word/Word';

const Answer: Props = ({words}) => {
    const {setNodeRef} = useDroppable({
        id: FieldNames.Answer,
    });
  return (
    <SortableContext
        id={FieldNames.Answer}
        items={words}
    >
        <AnswerContainer ref={setNodeRef}>
            {
                words.map((word) => {
                    return (
                        <Word
                            key={word.id}
                            word={word}
                            isVisible={true}
                        />
                    )
                })
            }
        </AnswerContainer>
    </SortableContext>
  );
}

export default Answer;
