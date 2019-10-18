import styled from 'styled-components'

export const PostsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  /* align-items: center; */
  margin-top: 6rem;

  @media (min-width: 960px) {
    margin-left: 2rem;
    margin-top: 0;
  }

  @media (min-width: 1280px) {
    margin-left: 10rem;
  }
  width: 100%;
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  font-size: 1.8rem;
`
