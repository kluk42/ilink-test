import styled from 'styled-components';

export const WordsCollectionContainer = styled.div<{}>`
    display: grid;
    grid-template-columns: repeat(auto-fill, 70px);
    grid-template-rows: repeat(2, 30px);
    width: 480px;
    row-gap: 15px;
    margin-top: 50px;
    column-gap: 10px;
    position: relative;
`

export const WordWrapper = styled.div<{}>`
    position: relative;
`

export const Background = styled.div<{}>`
    background: #E6E6E6;
    box-shadow: inset 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
    border-radius: 13px;
    width: 70px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`