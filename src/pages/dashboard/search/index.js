import { useNavigate } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import Card from "../../../components/card"
import TextInput from "../../../components/form/textInput"
import SearchIcon from "../../../assets/icons/searchIcon"
import { get } from "../../../service/apiClient"
import UserIcon from "../../../components/profile-icon"
import { useSearchResults } from "../../../context/searchResults"

const Search = () => {
    const [query, setQuery] = useState("");
    const {searchResults, setSearchResults} = useSearchResults();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const popupRef = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim())  return;
        try {
                const response = await get(`search/profiles/${query}`);
                setSearchResults(response.data.profiles);
                setIsOpen(true);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
     }

    useEffect(() => {
        function handleClickOutside(e) {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isOpen]);


      return (
            <div style={{ position: "relative", width: "100%" }}> 
                <form onSubmit={handleSubmit}>
                    <TextInput
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
                            zIndex: 20
                        }}
                    >
                        <Card>
                            <p className="people">People</p>
                            {searchResults?.length > 0 ? (
                                <ul>
                                    {searchResults.slice(0, 10).map((student) => (
                                        <li key={student.user.id} className="student-item">
                                            <UserIcon
                                                photo={student.photo}
  
                                                id={student.user.id}
                                                initials={student.firstName.charAt(0) + student.lastName.charAt(0)}
                                                firstname={student.firstName}
                                                lastname={student.lastName}
                                                role={student.specialism}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Sorry, no results found</p>
                            )}

                       
                            {searchResults?.length > 10 && (
                                <section>
                                    <button onClick={() => navigate("/search/profiles")}>All results</button>
                                </section>
                            )}
                        </Card>
                    </div>
                )}
            </div>
    );

}

export default Search;
