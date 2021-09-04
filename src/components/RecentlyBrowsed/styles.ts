import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  strong {
    margin-left: 5px;
  }
`;

export const Buttons = styled.div`
  button {
    border: 0;
    background: none;

    padding: 0 4px;

    transition: opacity 0.2s;

    & + button {
      margin-left: 10px;
    }

    &:hover {
      opacity: 0.5;
    }

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Ticker = styled.div`
  height: 100px;
  display: flex;

  > div {
    display: flex;
    overflow: auto;

    scroll-behavior: smooth;

    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge  */
    scrollbar-width: none; /* Firefox */

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
    }
  }
`;
