import styled, { css } from 'styled-components';

interface ContainerProps {
  showStar: boolean;
}

interface ValuationProps {
  isIncrease: boolean;
}

export const Container = styled.button<ContainerProps>`
  width: 360px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 0;
  background-color: ${({ theme }) => theme.colors.white};

  border-radius: 8px;
  padding: 15px 10px;

  margin: 4px 4px 10px;

  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 6px 6px 10px rgba(43, 37, 63, 0.1);
    transform: translate(-2px, -2px);
  }

  ${({ showStar }) =>
    showStar
      ? css`
          & + & {
            margin-left: 20px;
          }
        `
      : css`
          box-shadow: 6px 6px 10px rgba(43, 37, 63, 0.1);
          border-top: 1px solid rgba(43, 37, 63, 0.04);
          border-left: 1px solid rgba(43, 37, 63, 0.04);
        `}
`;

export const Company = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.div`
  position: relative;

  img {
    border-radius: 50%;
  }

  svg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;

    circle {
      stroke: ${({ theme }) => theme.colors.white};
      stroke-width: 2px;
      stroke-opacity: 0.5;
      fill: none;
    }
  }
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-left: 4px;

  strong {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray_003};
    cursor: inherit;
  }

  p {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.gray_002};
    text-align: left;
  }
`;

export const Valuation = styled.div<ValuationProps>`
  height: 100%;
  display: flex;
  align-items: flex-start;

  span {
    font-size: 13px;
    font-weight: 500;
    margin-right: 5px;

    color: ${({ theme, isIncrease }) =>
      isIncrease ? theme.colors.success : theme.colors.danger};
  }
`;
