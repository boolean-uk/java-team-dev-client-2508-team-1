import { createContext, useContext, useState } from "react";

const SearchResultsContext = createContext();

export const SearchResultsProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
            {children}
        </SearchResultsContext.Provider>
    );
}   

export const useSearchResults = () => useContext(SearchResultsContext);