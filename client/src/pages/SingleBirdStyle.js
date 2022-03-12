import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'

export const SingleBirdPageWrapper = styled.div `
  display: flex;
  background: url("https://images.unsplash.com/photo-1455218873509-8097305ee378?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80")
  center center
  no-repeat;
  background-size: cover;
  height: 100vh;
`

export const Backbutton = styled(LinkR) `  
  margin-left: 180px;
  position: absolute;
  bottom: 0;
  margin-top: 10px;
  color: white;
  font-size: 16px;
  padding: 10px 10px 10px 30px;
  text-decoration: none;
  border-radius: 0 15px 15px 0;
  padding: 40px;
  cursor: pointer;
  opacity: 0.7;
  
  &:hover{
    color: white;
    opacity: 1;
  }
`

export const SingleBirdContainer = styled.div `
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`

export const SingleBirdWrapper = styled.div `
  color: white;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 30px;
`
export const ImageWrapper = styled.div `
  height: 250px;
  width: 300px;
  overflow: hidden;
  background-position: center;
  border-radius: 20%;
`

export const SingleBirdImage = styled.img `
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const SingleBirdContent = styled.div `
  background-color: rgba(0,0,0,0.4);
  border-radius: 20px;
  height: fit-content;
  width: 300px;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  margin-left: 10px;
`

export const SingleBirdName = styled.h1  `
  font-size: 50px;
  margin-bottom: 20px;
`

export const SingleBirdSpecies = styled.p `
  font-size: 16px;
  padding: 5px;
`

export const SingleBirdWeight = styled.p `
  font-size: 16px;
  padding: 5px;
`

export const ViewEntries = styled(LinkR) `
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  padding: 5px;
  background-color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.7;
  color: black;

  &:hover{
    opacity: 1;
  }
`

export const DeleteBird = styled.button `
  position: absolute;
  right: 0;
  padding: 5px;
  color: white;
  background-color: red;
  margin: 20px;
  opacity: 0.8;
  cursor: pointer;
  border: none;
  border-radius: 5px;
   
  &:hover{
    opacity: 1;
  }
`

export const AnalysisContainer = styled.div `
  background-color: rgba(0,0,0,0.6);
  border: 1px dashed gray;
  border-radius: 20px;
  padding: 20px;
  width: 900px;
  height: 450px;
  margin-top: 30px;
  display: flex;
`

export const VisualContainer = styled.div `
  max-width: 70%;
  width: 100%;
  height: 400px;
  margin: 10px;
`

export const StatsContainer = styled.div ` 
  width: 100%;
  max-width: 30%;
  height: 400px;
  margin: 10px;
  border-right: 1px dashed gray;
`

export const StatsWrapper = styled.div `
  padding: 60px 0px;
  display: flex;
  flex-direction: column;
  color: white;
`
export const Statsdetail = styled.h3 `
  font-size: 1.2rem;
  padding: 5px;
  margin: 5px;
  line-height: 30px;
`

export const ChartContainer = styled.div `
  width: 80%;
  height: 80%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`

export const ChartChangeH1Line = styled.h1 `
  color: white;
  font-size: 1.2rem;
  float: right;
  cursor: pointer;
`

export const ChartChangeH1Bar = styled.h1 `
  color: white;
  font-size: 1.2rem;
  float: right;
  cursor: pointer;
`