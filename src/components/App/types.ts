export enum FieldNames {
    Answer = 'Answer',
    Collection = 'Collection'
}

export type WordFromBackend = {
    id: string;
    content: string;
};

export type WordToRender = {
    field: FieldNames
} & WordFromBackend;
