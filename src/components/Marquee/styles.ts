import styled, { keyframes } from 'styled-components';

interface ContentProps {
  duration: number;
}

const marquee = keyframes`
  0%   { transform: translate(0, 0); }
  100% { transform: translate(-100%, 0); }
`;

export const Container = styled.div`
  display: flex;

  width: 100%;
  height: 32px;

  border: 1px solid #a1a1a1;
  background-color: white;
  overflow: hidden;
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding-left: 100%;
  animation: ${marquee} ${({ duration }) => duration}s linear infinite;
`;
