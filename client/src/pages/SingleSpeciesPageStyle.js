import styled from 'styled-components'

export const SingleSpeciesPageWrapper = styled.div `
  display: flex;
  background: url("https://images.unsplash.com/photo-1455218873509-8097305ee378?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")
  center center
  no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
`
export const SingleSpeciesContainer = styled.div `
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
`

export const SingleSpeciesWrapper = styled.div `
  background-color: rgba(0,0,0,0.4);
  max-height: 300px;
  color: white;
  width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  display: flex;
  border-radius: 20px;
`

export const SingleSpeciesImage = styled.img `
  object-fit: cover;
  width: 300px;
  border-radius: 20px 0 0 20px;
  background-position: center center;
`

export const SingleSpeciesContent = styled.div `
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-left: 10px;
`

export const SingleSpeciesName = styled.h1  `
  font-size: 50px;
  margin-bottom: 20px;
`

export const SingleSpeciesDescription = styled.p `
  font-size: 16px;

`

export const DeleteButton = styled.button `
  position: absolute;
  right: 0;
  font-size: 15px;
  background-color: red;
  color: white;
  padding: 5px;
  border: none;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
`

export const UpdateButton = styled.button `
  position: absolute;
  right: 10%;
  font-size: 15px;
  color: white;
  padding: 5px;
  border: none;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
`
