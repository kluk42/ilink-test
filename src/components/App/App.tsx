import { useRef, useState } from 'react';
import {DndContext, DragStartEvent, DragOverEvent, DragOverlay, DragEndEvent} from '@dnd-kit/core';
import {v4 as uuid} from 'uuid';

import {Header, Human, HumanBody, HumanHead, Main, PhraseContainer, DraggableWord, Warning} from './styles';

import BodyPath from '../../assets/Body.png';
import HeadPath from '../../assets/Head.png';

import {ActiveWord, FieldNames, ReplacedWord, WordFromBackend, WordsToRender, WordToPick} from './types';

import Answer from '../Answer/Answer';
import CheckBtn from '../CheckBtn/CheckBtn';
import Quote from '../Quote/Quote';
import WordsCollection from '../WordsCollection/WordsCollection';

const quote = 'Bowl pen paper thread carpet table telephone';

const answer = 'плошка ручка бумага нить коврик стол телефон';

const wordsFromBackend: WordFromBackend[] = [
    { id: uuid(), content: "плошка", },
    { id: uuid(), content: "ручка", },
    { id: uuid(), content: "бумага", },
    { id: uuid(), content: "нить", },
    { id: uuid(), content: "коврик", },
    { id: uuid(), content: "стол", },
    { id: uuid(), content: "телефон", },
];

const wordsToPick: WordToPick[] = wordsFromBackend.map(w => ({
    ...w,
    isRenderedInCollection: true,
}))

function App() {
    const [words, setWords] = useState<WordsToRender>({
        [FieldNames.Answer]: [],
        [FieldNames.Collection]: wordsToPick,
    });
    const [activeWord, setActiveWord] = useState<ActiveWord | null>(null);
    const [replacedWord, setReplacedWord] = useState<ReplacedWord | null>(null);
    const [isTranslationWrong, setIsTranslationWrong] = useState(false);
    const synthRef = useRef(window.speechSynthesis);

    function handleDragStart(event: DragStartEvent) {
        setIsTranslationWrong(false);

        const sourceContainer: FieldNames = event.active.data.current?.sortable.containerId;
        const isInAnswer = sourceContainer === FieldNames.Answer;

        const wordsSetter = (fieldName: FieldNames) => {
            const pickedWord = words[fieldName].find(word => word.id === event.active.id);
            if (pickedWord) {
                setActiveWord({
                    ...pickedWord,
                    sourceContainer: sourceContainer,
                });
                    const newArray = [...words[fieldName]];
                    const indxToInsert = newArray.findIndex(w => w.id === pickedWord.id);
                    const wordToInsert: WordToPick = {
                        ...pickedWord,
                        id: fieldName === FieldNames.Collection ? pickedWord.id + ' empty' : pickedWord.id,
                        isRenderedInCollection: false
                    }
                    newArray.splice(indxToInsert, 1, wordToInsert);
                    setWords(prev => ({
                        ...prev,
                        [fieldName]: FieldNames.Collection ? newArray : newArray.filter(w => w.id !== pickedWord.id),
                    }));
                    return
            }
        }
        
        if (isInAnswer) {
            wordsSetter(FieldNames.Answer)
        }
            
        if (!isInAnswer) {
            wordsSetter(FieldNames.Collection)
        }
    }

    function handleDragOver(event: DragOverEvent) {
        const { over } = event;
        const overId = over?.id;
        
        if (overId === null) {
            return
        }

        if (overId === FieldNames.Answer && activeWord) {
            const isAlreadyInAnswers = words[FieldNames.Answer].some(w => w.id === activeWord.id);
            if (replacedWord) {
                const newCollection = [...words[FieldNames.Collection]];
                const [idToInsert] = replacedWord.id.split(' ');
                const wordToInsert: WordToPick = {
                    id: idToInsert + ' empty',
                    content: replacedWord.content,
                    isRenderedInCollection: false
                }
                newCollection.splice(replacedWord.initialIndex, 1, wordToInsert);
                setWords(prev => ({
                    ...prev,
                    [FieldNames.Collection]: newCollection,
                }));
                setReplacedWord(null);
            }
            if (isAlreadyInAnswers) {
                return
            }
            const wordToInsert: WordToPick = {
                id: activeWord.id,
                content: activeWord.content,
                isRenderedInCollection: false,
            }
            const newAnswer = [...words[FieldNames.Answer], wordToInsert];
            setWords(prev => ({
                ...prev,
                [FieldNames.Answer]: newAnswer,
            }));
            return;
        }

        if (!over) {
            const isWordInAnswer = words[FieldNames.Answer].some(w => w.id === activeWord?.id);
            if (isWordInAnswer) {
                const newAnswer = [...words[FieldNames.Answer]].filter(w => w.id !== activeWord?.id);
                setWords(prev => ({
                    ...prev,
                    [FieldNames.Answer]: newAnswer,
                }));
                return;
            }
            if (replacedWord) {
                const newCollection = [...words[FieldNames.Collection]];
                const wordToReturn: WordToPick = {
                    id: replacedWord.id,
                    content: replacedWord.content,
                    isRenderedInCollection: false,
                }
                newCollection.splice(replacedWord.initialIndex, 1, wordToReturn);
                setWords(prev => ({
                    ...prev,
                    [FieldNames.Collection]: newCollection
                }))
                setReplacedWord(null);
            }
        }

        if (overId !== FieldNames.Collection && overId !== FieldNames.Answer) {
            if (over?.data.current!.sortable.containerId === FieldNames.Collection && activeWord) {
                const hoveredWord = words[FieldNames.Collection].find(w => w.id === overId);
                if (hoveredWord) {
                    const [idToCheck, temp] = hoveredWord.id.split(' ');
                    const isTheSameWord = idToCheck === activeWord.id;
                    if (hoveredWord.isRenderedInCollection && !isTheSameWord && !temp) {
                        if (replacedWord) { 
                            const wordToReturn: WordToPick = {
                                id: replacedWord.id,
                                content: replacedWord.content,
                                isRenderedInCollection: false,
                            }
                            const newCollection = [...words[FieldNames.Collection]];
                            newCollection.splice(replacedWord.initialIndex, 1, wordToReturn);
                            setWords(prev => ({
                                ...prev,
                                [FieldNames.Collection]: newCollection
                            }));
                            setReplacedWord(null);
                            return
                        }
                        return
                    }
                    const [id, empty] = hoveredWord.id.split(' ');

                    if (empty === 'empty') {
                        const wordToInsert: WordToPick = {
                            id: activeWord.id + ' temp',
                            content: activeWord.content,
                            isRenderedInCollection: true
                        }

                        const indexToInsert = words[FieldNames.Collection].findIndex(w => w.id === id + ' empty');
                        if (replacedWord === null) {
                            const wordToReplace = words[FieldNames.Collection][indexToInsert];
                            const newCollection = [...words[FieldNames.Collection]];
                            newCollection.splice(indexToInsert, 1, wordToInsert);
                            setReplacedWord({
                                id: wordToReplace.id,
                                content: wordToReplace.content,
                                initialIndex: indexToInsert
                            });
                            setWords(prev => ({
                                ...prev,
                                [FieldNames.Collection]: newCollection
                            }));
                            return;
                        } 
                        else {
                            const wordToReturn: WordToPick = {
                                id: replacedWord.id,
                                content: replacedWord.content,
                                isRenderedInCollection: false
                            }
                            const wordToReplace = words[FieldNames.Collection][indexToInsert];

                            const newCollection = [...words[FieldNames.Collection]];
                            newCollection.splice(replacedWord.initialIndex, 1, wordToReturn);
                            newCollection.splice(indexToInsert, 1, wordToInsert);
                            console.log(newCollection);
                            setWords(prev => ({
                                ...prev,
                                [FieldNames.Collection]: newCollection,
                            }));
                            setReplacedWord({
                                id: wordToReplace.id,
                                content: wordToReplace.content,
                                initialIndex: indexToInsert
                            })
                            return
                        }
                    }
                }
            }
        }
    }
      
    function handleDragEnd(event: DragEndEvent) {
        const {over} = event;
        if (over && over.id !== FieldNames.Answer && over.id !== FieldNames.Collection && activeWord) {
            const containerName = over.data.current!.sortable.containerId;
            if (containerName === FieldNames.Answer) {
                const indexToInsert = over.data.current!.sortable.index;
                const answer = [...words[FieldNames.Answer]];
                const wordToReplace: WordToPick = {
                    id: activeWord.id,
                    content: activeWord.content,
                    isRenderedInCollection: false,
                }
                const newAnswer = answer.filter(w => w.id !== activeWord.id);
                newAnswer.splice(indexToInsert, 0, wordToReplace)
                setWords(prev => ({
                    ...prev,
                    [FieldNames.Answer]: newAnswer,
                }))
                setActiveWord(null);
                setReplacedWord(null);
                return
            }
            if (containerName === FieldNames.Collection) {
                const [, temp] = over.id.split(' ');
                if (temp === 'temp' && replacedWord) {
                    const [replacedId] = replacedWord.id.split(' ');
                    const isNecessaryCell = replacedId === activeWord.id;
                    if (isNecessaryCell) {
                        const newCollection = [...words[FieldNames.Collection]];
                        const wordToInsert: WordToPick = {
                            id: activeWord.id,
                            content: activeWord.content,
                            isRenderedInCollection: true,
                        }
                        newCollection.splice(replacedWord.initialIndex, 1, wordToInsert);
                        setWords(prev => ({
                            ...prev,
                            [FieldNames.Collection]: newCollection
                        }));
                        setReplacedWord(null);
                        return
                    }
                    if (!isNecessaryCell) {
                        const newCollection = [...words[FieldNames.Collection]];
                        const wordToInsert: WordToPick = {
                            id: activeWord.id,
                            content: activeWord.content,
                            isRenderedInCollection: true,
                        }
                        const indxToInsert = words[FieldNames.Collection].findIndex(w => w.id === activeWord.id + ' empty');
                        const wordToReturn: WordToPick = {
                            id: replacedId + ' empty',
                            content: replacedWord.content,
                            isRenderedInCollection: false
                        };
                        newCollection.splice(replacedWord.initialIndex, 1, wordToReturn);
                        newCollection.splice(indxToInsert, 1, wordToInsert);
                        setWords(prev => ({
                            ...prev,
                            [FieldNames.Collection]: newCollection
                        }));
                        setReplacedWord(null);
                        return
                    }
                }
                if (!temp) {
                    const newCollection = [...words[FieldNames.Collection]];
                    const wordToInsert: WordToPick = {
                        id: activeWord.id,
                        content: activeWord.content,
                        isRenderedInCollection: true,
                    }
                    const indexToInsert = newCollection.findIndex(w => w.id === activeWord.id + ' empty');
                    newCollection.splice(indexToInsert, 1, wordToInsert);
                    setWords(prev => ({
                        ...prev,
                        [FieldNames.Collection]: newCollection,
                    }));
                    return
                }
            }
        }

        if (over?.id === FieldNames.Collection && activeWord) {
            const wordToInsert = {
                id: activeWord.id,
                content: activeWord.content,
                isRenderedInCollection: true,
            }
            const indexToInsert = words[FieldNames.Collection].findIndex(w => w.id === activeWord.id + ' empty');
            const newCollection = [...words[FieldNames.Collection]];
            newCollection.splice(indexToInsert, 1, wordToInsert);
            setWords(prev => ({
                ...prev,
                [FieldNames.Collection]: newCollection,
            }))
            setActiveWord(null);
            setReplacedWord(null);
            return
        }

        if (over === null && activeWord) {
            if (activeWord.sourceContainer === FieldNames.Answer) {
                const newAnswer = [...words[FieldNames.Answer]];
                newAnswer.push({
                    id: activeWord.id,
                    content: activeWord.content,
                    isRenderedInCollection: false
                });
                setActiveWord(null);
                setWords(prev => ({
                    ...prev,
                    [FieldNames.Answer]: newAnswer
                }));
                setReplacedWord(null);
                return
            }

            if (activeWord.sourceContainer === FieldNames.Collection) {
                const wordToInsert = {
                    id: activeWord.id,
                    content: activeWord.content,
                    isRenderedInCollection: true,
                }
                const indexToInsert = words[FieldNames.Collection].findIndex(w => w.id === activeWord.id + ' empty');
                const newCollection = [...words[FieldNames.Collection]];
                newCollection.splice(indexToInsert, 1, wordToInsert);
                setWords(prev => ({
                    ...prev,
                    [FieldNames.Collection]: newCollection,
                }));
                setActiveWord(null);
                setReplacedWord(null);
                return
            }
            setReplacedWord(null);
        }
    }

    const handleCheckClick = () => {
        const insertedAnswer = words[FieldNames.Answer].reduce((acc: string, word) => {
            if (acc !== '') {
                return acc + ' ' + word.content
            } else {
                return acc + word.content
            }
        }, '');
        const isTranslationWrong = insertedAnswer !== answer
        setIsTranslationWrong(isTranslationWrong);
        if (!isTranslationWrong) {
            const utter = new SpeechSynthesisUtterance(quote);
            utter.lang = 'en';
            synthRef.current.speak(utter);
        }
    }

  return (
        <Main>
            <div>
                <Header>
                    Translate this sentence
                </Header>
                <PhraseContainer>
                    <Human>
                        <HumanHead src={HeadPath} alt="Head"/>
                        <HumanBody src={BodyPath} alt="Head"/>
                    </Human>
                    <Quote
                        quote={quote}
                    />
                </PhraseContainer>
            </div>
            <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                <Answer words={words[FieldNames.Answer]}/>
                <WordsCollection words={words[FieldNames.Collection]}/>
                <DragOverlay>{!!activeWord ? <DraggableWord>{activeWord?.content}</DraggableWord> : null}</DragOverlay>
            </DndContext>
            {isTranslationWrong && <Warning>Something wrong!</Warning>}
            <CheckBtn
                isWrong={isTranslationWrong}
                handleClick={handleCheckClick}
                isDisabled={words[FieldNames.Answer].length === 0}
            />
        </Main>
  );
}

export default App;
