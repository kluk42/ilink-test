import styled from 'styled-components';
import BackgroundPath from '../../assets/Quote.svg';

export const QuoteContainer = styled.div<{}>`
    background-image: url(${BackgroundPath});
    background-position: center;
    background-size: cover;
    height: fit-content;
    min-height: 90px;
    width: 306px;
    padding: 17px 24px 17px 40px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
`

export const WordWrapper = styled.div<{}>`
    padding-bottom: 1px;
    border-bottom: 1px dashed black;
    display: flex;
    align-self: flex-start;
`

export const Word = styled.p<{}>`
    font-size: 18px;
    line-height: 21px;
    width: fit-content;
`
