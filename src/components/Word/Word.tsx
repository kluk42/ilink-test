import {useSortable} from '@dnd-kit/sortable';
import {WordContainer} from './styles';

import {Props} from './types';

const Word: Props = ({word, isInCollection, isVisible}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: word.id,
      });
      return (
        <WordContainer
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            isInCollection={isInCollection}
            transform={transform}
            transition={transition}
            isVisible={isVisible}
        >
            {word.content}
        </WordContainer>
  );
}

export default Word;
