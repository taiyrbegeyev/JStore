import styled from 'styled-components'

export const IdentityCardWrapper = styled.div`
  height: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 30rem;
  border: 0.15rem solid #eaeaea;
`

export const ProfilePictureInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
`

export const ProfileImage = styled.div`
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  background-color: gray;
  color: white;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const UserName = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ListOfTabs = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  margin: auto;
`

export const Tab = styled.li`
  width: 100%;
  padding: 1rem;
  list-style: none;
  border-top: 0.15rem solid #eaeaea;
  display: flex;
  align-items: center;
`
