import styled from 'styled-components';

export const WordContainer = styled.div<{isInCollection?: boolean}>`
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
    margin-top: ${props => !props.isInCollection ? '8px' : 0};
    align-items: center;
    position: relative;
    z-index: 2;
`