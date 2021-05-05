import { Droppable } from 'react-beautiful-dnd';

import {Background, WordsCollectionContainer, WordWrapper} from './styles';

import {FieldNames} from '../App/types';
import {Props} from './types';

import Word from '../Word/Word';

const WordsCollection: Props = ({words}) => {
  return (
            <Droppable
                droppableId="Collection"
                direction="horizontal"
            >
                {
                    (provided) => {
                        return (
                            <>
                                <WordsCollectionContainer
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {
                                        words.map((word, index) => {
                                            if (word.field === FieldNames.Collection) {
                                                return (
                                                    <WordWrapper key={word.id}>
                                                        <Word
                                                            word={word}
                                                            index={index}
                                                            isInCollection
                                                        />
                                                        <Background/>
                                                    </WordWrapper>
                                                )
                                            } else {
                                                return (
                                                    <WordWrapper key={word.id}>
                                                        <Background/>
                                                    </WordWrapper>
                                                )
                                            }
                                        })
                                    }
                                </WordsCollectionContainer>
                                {provided.placeholder}
                            </>
                        )
                    }
                }
            </Droppable>
  );
}

export default WordsCollection;
