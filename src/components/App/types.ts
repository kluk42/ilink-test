export enum FieldNames {
    Answer = 'Answer',
    Collection = 'Collection'
}

export type WordFromBackend = {
    id: string;
    content: string;
};

export type WordToPick = WordFromBackend & {isRenderedInCollection: boolean}

export type ActiveWord = WordFromBackend & {sourceContainer: FieldNames};

export type ReplacedWord = WordFromBackend & {initialIndex: number};

export interface WordsToRender {
    [FieldNames.Answer]: WordToPick[],
    [FieldNames.Collection]: WordToPick[],
}
