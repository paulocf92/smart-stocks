import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const Container = styled.main`
  flex: 1;
  overflow: hidden;
`;

export const Content = styled.main`
  height: 100%;
  padding: 1rem 2rem;
  border-radius: 24px 0 0 0;
  background-color: ${({ theme }) => theme.colors.gray_001};

  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const PageTitle = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 1.5rem;

  strong {
    margin-left: 8px;
    font-size: 24px;
    font-weight: bold;
  }
`;
