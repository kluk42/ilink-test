import { Droppable } from 'react-beautiful-dnd';

import {AnswerContainer} from './styles';

import {Props} from './types';

import Word from '../Word/Word';
import { FieldNames } from '../App/types';

const Answer: Props = ({words}) => {
  return (
            <Droppable
                droppableId="Answer"
            >
                {
                    (provided) => {
                        return (
                            <AnswerContainer
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {
                                    words.map((word, index) => {
                                        return (
                                            word.field === FieldNames.Answer
                                            &&
                                            <Word
                                                key={word.id}
                                                word={word}
                                                index={index}
                                            />
                                        )
                                    })
                                }
                            </AnswerContainer>  
                        )
                    }
                }
            </Droppable>
  );
}

export default Answer;
