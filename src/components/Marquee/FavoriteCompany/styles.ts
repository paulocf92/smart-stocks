import styled from 'styled-components';

interface ContainerProps {
  isIncrease: boolean;
}

export const Container = styled.button<ContainerProps>`
  border: 0;
  background: none;
  display: flex;
  white-space: nowrap;
  margin: 0 10px;

  font-size: 13px;

  &:hover {
    opacity: 0.8;
  }

  > *:not(:first-child) {
    margin-left: 10px;
  }

  strong {
    font-weight: 600;
    cursor: inherit;
  }

  div:nth-child(n + 4) {
    background-color: ${({ isIncrease, theme }) =>
      isIncrease
        ? theme.colors.success_translucent
        : theme.colors.danger_translucent};
  }
`;
