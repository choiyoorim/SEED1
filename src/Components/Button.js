import styled,{css} from "styled-components";
import React from 'react';

const SIZES={
    sm: css`
        --button-font-size: 0.875rem;
        --button-padding: 4px 8px;
        --button-radius: 2px;
    `,
    md: css`
        --button-font-size: 1rem;
        --button-padding: 12px 16px;
        --button-radius: 2px;
    `,
    lg: css`
        --button-font-size: 1.25rem;
        --button-padding: 16px 20px;
        --button-radius: 2px;
    `,
};

function Button({click,disabled,size,children}){
    const sizeStyle = SIZES[size];
    return (
        <StyledButton onClick={click} disabled={disabled} sizeStyle={sizeStyle}>
            {children}
        </StyledButton>
    ); //disabled라는 매개변수 -> disabled에 담아 -> true면 children 실행
}

const StyledButton = styled.button`
${(p)=>p.sizeStyle}    
    border: none;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
    font-size: var(--button-font-size, 1rem);
    padding: var(--button-padding, 12px 16px);
    border-radius: var(--button-radius, 8px);
    background: var(--button-bg-color, #FFBB00);
    color: var(--button-color, #000000);

    &:active,
    &:hover,
    &:focus {
    background: var(--button-hover-bg-color, #FFBB00);
    }

    &:disabled {
    cursor: default;
    opacity: 0.5;
    background: var(--button-bg-color, #FFBB00);
    }
`;

export default Button;