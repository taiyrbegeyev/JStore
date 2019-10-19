import styled from 'styled-components'

export const MainContainer = styled.div`
  padding: 0 2rem;
  margin: 4rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1200px) {
    padding: 0 2rem 0 8rem;
    flex-direction: row;
    align-items: flex-start;
  }
`
