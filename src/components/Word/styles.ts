import styled from 'styled-components';

import { WordContainerProps } from './types';

export const WordContainer = styled.div.attrs<WordContainerProps>((props) => ({
    style: {
        transform: !!props.transform ?  `translate3d(${props.transform.x}px, ${props.transform.y}px, 0)` : undefined,
        zIndex: !!props.transform ? 3 : 2,
        transition: !!props.transition ? props.transition : undefined,
    },
}))<WordContainerProps>`
    visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
    cursor: pointer;
    background: #FFFFFF;
    border: 1px solid #C9C9C9;
    box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
    border-radius: 13px;
    font-size: 18px;
    line-height: 21px;
    width: 70px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: ${props => !props.isInCollection ? '8px' : 0};
`