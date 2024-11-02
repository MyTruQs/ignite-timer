import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

interface ButtonContainerProps {
    variant: ButtonVariant;
}

const buttonVariants = {
    primary: 'purple',
    secondary: 'green',
    success: 'blue',
    danger: 'red',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100%;
    height: 40px;

    ${props => {
        return css`
            background-color: ${buttonVariants[props.variant]};
        `
    }}
`