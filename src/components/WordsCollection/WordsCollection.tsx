import { useDroppable } from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable'

import {Background, WordsCollectionContainer, WordWrapper} from './styles';

import { FieldNames } from '../App/types';
import {Props} from './types';

import Word from '../Word/Word';

const WordsCollection: Props = ({words}) => {
    const {setNodeRef} = useDroppable({
        id: FieldNames.Collection,
        disabled: true
    });
  return (
      <SortableContext
        id={FieldNames.Collection}
        items={words}
      >
        <WordsCollectionContainer ref={setNodeRef} id={FieldNames.Collection}>
            {
                words.map((word) => {
                        return (
                            <WordWrapper key={word.id}>
                                <Word
                                    word={word}
                                    isInCollection
                                    isVisible={word.isRenderedInCollection}
                                />
                                <Background/>
                            </WordWrapper>
                        )
                })
            }
        </WordsCollectionContainer>
        </SortableContext>
  );
}

export default WordsCollection;
