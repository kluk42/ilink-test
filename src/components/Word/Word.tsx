import { Draggable } from 'react-beautiful-dnd';
import {WordContainer} from './styles';

import {Props} from './types';

const Answer: Props = ({word, index, isInCollection}) => {
  return (
            <Draggable draggableId={word.id} index={index}>
                {
                    (provided, snapshot) => {
                        return (
                            <WordContainer
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                isInCollection={isInCollection}
                            >
                                {word.content}
                            </WordContainer>
                        )
                    }
                }
            </Draggable>
  );
}

export default Answer;
