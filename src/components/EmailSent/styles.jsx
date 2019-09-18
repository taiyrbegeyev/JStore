import styled from 'styled-components'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  justify-content: center;
`

export const CheckedIcon = styled(CheckCircleIcon)`
  &&& {
    font-size: 6rem;
    color: green;
  }
`

export const SuccessText = styled.p`
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 450;
  text-align: center;
  color: #004180;
`
