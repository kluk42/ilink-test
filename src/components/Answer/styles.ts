import styled from 'styled-components';

export const AnswerContainer = styled.div<{}>`
    display: flex;
    flex-wrap: wrap;
    width: 480px;
    height: 93px;
    border-top: 1px solid #4B4B4B;
    border-bottom: 1px solid #4B4B4B;
    row-gap:1px;
    background:
        repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 45px,
            #4B4B4B 45px,
            #4B4B4B 46px /*+2px here*/
        );
`