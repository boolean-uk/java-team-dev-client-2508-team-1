import {  useRef, useState } from "react";
import TextInput from "../../../../components/form/textInput";
import SearchIcon from "../../../../assets/icons/searchIcon";
import { get } from "../../../../service/apiClient";
import '../../style.css';

import MultipleStudentsSearch from "../multipleStudentsMenu/searchMultiple";



const SearchBarMultiple = ({handleSelectStudent, isOpenSearchBar, setIsOpenSearchBar, selectedStudents}) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const popupRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        try {
        const response = await get(`search/profiles/${query}`);
        setSearchResults(response.data.profiles);
        setIsOpenSearchBar(true);
        } catch (error) {
        console.error("Error fetching search results:", error);
        }
    };

    return (
    <>
    <div className="add-search">
        <form onSubmit={handleSubmit}>
        <TextInput
            placeholder="Search for people"
            icon={<SearchIcon />}
            value={query}
            name="Search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
            }}
        />
        </form>

          {isOpenSearchBar && (
            <div
              ref={popupRef}
              className="search-results-popup"
              style={{
                position: "relative",
                top: "100%",
                left: 0,
                width: "100%",
                zIndex: 20,
              }}
            >
              {searchResults.length > 0 ? (
                <MultipleStudentsSearch
                   students={searchResults}
                    handleSelectStudent ={handleSelectStudent }
                    selectedStudents={selectedStudents}
                    />
              ) : (
                <p>No students with this name found</p>
              )}
            </div>
          )}
        </div>
    </>
    )
}

export default SearchBarMultiple