import styled from 'styled-components'

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;

  @media (min-width: 1200px) {
    margin-top: 0;
  }

  width: 100%;
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  font-size: 1.8rem;
`
