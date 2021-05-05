import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';

import {Header, Human, HumanBody, HumanHead, Main, PhraseContainer} from './styles';

import BodyPath from '../../assets/Body.png';
import HeadPath from '../../assets/Head.png';

import {WordFromBackend, WordToRender, FieldNames} from './types';

import Answer from '../Answer/Answer';
import CheckBtn from '../CheckBtn/CheckBtn';
import Quote from '../Quote/Quote';
import WordsCollection from '../WordsCollection/WordsCollection';

const itemsFromBackend: WordToRender[] = [
    { id: uuid(), content: "esse", field:  FieldNames.Collection},
    { id: uuid(), content: "esst", field:  FieldNames.Collection },
    { id: uuid(), content: "brot", field:  FieldNames.Collection },
    { id: uuid(), content: "essen", field:  FieldNames.Collection },
    { id: uuid(), content: "apfel", field:  FieldNames.Collection },
    { id: uuid(), content: "sie", field:  FieldNames.Collection },
    { id: uuid(), content: "und", field:  FieldNames.Collection },
    { id: uuid(), content: "sie", field:  FieldNames.Collection },
    { id: uuid(), content: "isst", field:  FieldNames.Collection },
    { id: uuid(), content: "einen", field:  FieldNames.Answer },
    { id: uuid(), content: "sie", field:  FieldNames.Answer },
  ];

function App() {
    const [words, setWords] = useState<WordToRender[]>(itemsFromBackend);
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
                        quote="Bla bla bla bla Bla bla bla bla"
                    />
                </PhraseContainer>
            </div>
            <DragDropContext onDragEnd={() => console.log('')}>
                <Answer words={words}/>
                <WordsCollection words={words}/>
            </DragDropContext>
            <CheckBtn/>
        </Main>
  );
}

export default App;
