import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.form`
  width: 50%;
  height: 40px;
  display: flex;
  border: 1px solid #e1e0e7;
  border-radius: 8px;
  margin-bottom: 1.5rem;

  input {
    width: 100%;
    border: 0;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    padding: 0 0.8rem;

    &::placeholder {
      color: #acacac;
    }
  }

  button {
    display: flex;
    align-items: center;

    border: 0;
    background: none;
    background-color: ${theme.colors.primary};
    border-radius: 8px;
    padding: 8px;
  }
`;
