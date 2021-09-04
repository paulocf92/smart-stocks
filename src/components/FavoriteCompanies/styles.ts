import styled from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  flex-basis: 400px;

  margin: 20px;

  overflow: hidden;
  height: 90vh;
`;

export const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.primary_translucent_002};
  border-radius: 30px;
  padding: 4px 8px 4px 4px;

  margin-bottom: 2rem;

  strong {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};

    margin: 0 10px;
  }

  > div:first-child {
    img {
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
    }
  }

  button {
    border: 0;
    background: none;

    transition: opacity 0.2s;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  strong {
    margin-left: 5px;
  }
`;

export const Favorites = styled.div`
  overflow: auto;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 10px;
  }
`;

export const Delete = styled.button`
  border: 0;
  background: none;
  margin-right: 15px;

  transition: all 0.3s;

  &:hover {
    opacity: 0.5;
    transform: scale(1.3);
  }
`;
