import styled from 'styled-components';

import {StyleProps} from './types';

export const Button = styled.button<StyleProps>`
    cursor: pointer;
    width: 470px;
    height: 68px;
    border: none;
    background: linear-gradient(91.2deg, #FFFFFF 0%, #F2F2F2 100%);
    box-shadow: -2px -4px 8px #FFFFFF, 2px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 88px;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    margin-top: ${props => props.isWrong ? '27px' : '79px'};
    color: ${props => props.active ? 'black' : 'grey'};
`