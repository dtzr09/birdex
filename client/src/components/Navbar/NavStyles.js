import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const NavContainer = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(49, 103, 70, 0.6);
    color: c1a673;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`

export const NavTitle = styled(LinkR) `
    padding: 10px;
    margin-left: 10px;
    font-size: 35px;
    text-decoration: none;
    color: black;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 10px;
    
    &:hover{
      color: white;
    }
`

export const AddSpeciesButton = styled.button `
  padding: 10px 5px;
  border-radius: 10px;
  width: 100%;
  max-width: 150px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.7;
  border: none;
  cursor: pointer;

  &:hover{
    opacity: 1;
  }
`