import styled from 'styled-components';
import { DotLoader } from 'react-spinners';
import { css } from '@emotion/react';

import theme from '../../styles/theme';

interface ValuationProps {
  isIncrease: boolean;
}

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px rgba(222, 222, 231, 0.4);
  border-radius: 8px;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
`;

export const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;

  padding: 0 2rem;
  margin-bottom: 10px;
`;

export const Company = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  button {
    border: 0;
    background: none;

    transition: opacity 0.2s;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export const Name = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 10px;

  strong {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray_003};
  }

  p {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.gray_002};
    cursor: default;
  }
`;

export const TooltipWrapper = styled.div`
  position: relative;

  span {
    width: 180px;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    font-size: 14px;
    padding: 4px;
    border-radius: 4px;
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.primary_translucent_002};

    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.primary} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

export const Valuation = styled.div<ValuationProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    strong {
      font-size: 16px;
      font-weight: 900;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.gray_003};
      margin-left: 5px;
    }
  }

  span {
    font-size: 14px;
    font-weight: 500;
    cursor: default;
    color: ${({ theme, isIncrease }) =>
      isIncrease ? theme.colors.success : theme.colors.danger};
  }
`;

export const Blank = styled.strong`
  color: #999;
  font-size: 15px;
  font-weight: 500;
`;

export const Loader = styled(DotLoader).attrs({
  css: css`
    position: absolute;
    top: 50%;
    left: 50%;
  `,
  size: 60,
  color: theme.colors.primary_translucent_001,
})``;
