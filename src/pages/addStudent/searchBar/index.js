import { useEffect, useRef, useState } from "react";
import { get } from "../../../service/apiClient";
import TextInput from "../../../components/form/textInput";
import SearchIcon from "../../../assets/icons/searchIcon";
import SearchResultsStudents from "../searchResults";

const SearchBar = ({setSelectedStudent, selectedStudent}) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        try {
        const response = await get(`search/profiles/${query}`);
        console.log(response);
        setSearchResults(response.data.profiles);
        setIsOpen(true);
        } catch (error) {
        console.error("Error fetching search results:", error);
        }
    };

    const handleSelectStudent = (student) => {
        console.log("Selected student:", student);
        setSelectedStudent(student); 
        setQuery(`    ${student.firstName} ${student.lastName}`); 
        setIsOpen(false);
    };

    useEffect(() => {
    if (selectedStudent) {
        setQuery(`${selectedStudent.firstName} ${selectedStudent.lastName}`);
    }
    }, [selectedStudent]);


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

          {isOpen && (
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
                <SearchResultsStudents
                  students={searchResults}
                  onSelect={handleSelectStudent}
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

export default SearchBar