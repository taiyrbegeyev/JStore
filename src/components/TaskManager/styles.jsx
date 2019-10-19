import styled from 'styled-components'

export const TaskManagerWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  /* align-items: center; */
  margin-top: 6rem;

  @media (min-width: 960px) {
    margin-left: 4rem;
  }

  @media (min-width: 1200px) {
    margin-top: 0;
  }

  @media (min-width: 1280px) {
    margin-left: 10rem;
  }
`
