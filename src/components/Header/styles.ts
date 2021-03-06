import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.header`
  margin-right: 1rem;
`;

export const Content = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;

  > a {
    margin: 1rem 1rem 3rem;
  }

  nav {
    display: flex;
    align-items: center;
    flex-direction: column;

    a {
      display: flex;
      position: relative;
      width: 100%;
      padding: 0.4rem 0 0.4rem 1.5rem;

      a + a {
        margin-bottom: 2rem;
      }

      & div {
        transition: opacity 0.2s;
      }

      &:hover div {
        opacity: 0.8;
      }

      &.active::after {
        content: '';
        position: absolute;
        background: ${theme.colors.secondary};
        border-radius: 0 4px 4px 0;
        height: 100%;
        width: 4px;
        bottom: 0;
        left: 0;
      }
    }
  }

  button {
    margin-left: auto;
  }
`;
