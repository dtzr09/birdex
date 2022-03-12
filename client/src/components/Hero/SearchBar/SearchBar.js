import React from 'react'
import {
    SearchContainer,
    SearchWrapper,
    SearchLabel,
    SearchInput,
} from './SearchBarStyles'

function SearchBar({value, handleChange}) {

    return (
        <div>
            <SearchContainer>
                <SearchWrapper>
                    <SearchLabel> Search by name </SearchLabel>
                    <SearchInput
                        type="text"
                        value={value}
                        onChange={handleChange}
                    />
                </SearchWrapper>
            </SearchContainer>
        </div>
    )
}

export default SearchBar
