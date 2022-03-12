import styled from 'styled-components'

export const SearchContainer = styled.div `
    background-color: transparent;
    display: flex;
    padding: 40px;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;

    //Styling the input field
    [type="text"]{
      padding: 5px;
    }
`

export const SearchWrapper = styled.div `
    display: flex; 
    flex-direction: column;
`

export const SearchLabel = styled.h3 `
    font-size: 18px;
    color: white;
    margin-bottom: 10px;
    font-size: 20px;
`

export const SearchInput = styled.input `
    opacity: 0.7;
    border-radius: 10px;
    border: none;
    outline: none;
    width: 300px;
    height: 30px;
`