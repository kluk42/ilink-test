import styled from 'styled-components';

export const Main = styled.main<{}>`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

export const Header = styled.h1<{}>`
    font-size: 36px;
    line-height: 42px;
    color: #252525;
    text-shadow: -2px -4px 3px #FFFFFF, 2px 4px 3px rgba(0, 0, 0, 0.25);
    margin-bottom: 56px;
`

export const PhraseContainer = styled.div<{}>`
    display: flex;
    margin-bottom: 50px;
`

export const Human = styled.div<{}>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const HumanHead = styled.img<{src: string, alt: string}>`
    width: 114px;
    position: relative;
    top: 6px;
    left: 0;
`

export const HumanBody = styled.img<{alt: string, src: string}>`
    width: 186px;
    height: 90px
`

export const AnswerContainer = styled.div<{}>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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