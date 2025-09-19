import { useState } from "react";
import { get } from "../../service/apiClient";
import Card from "../../components/card";
import TextInput from "../../components/form/textInput";
import SearchIcon from "../../assets/icons/searchIcon";
import UserIcon from "../../components/profile-icon";
import './style.css';
import ArrowBack from "../../assets/icons/arrowBack";
import { useNavigate } from "react-router-dom";
import { useSearchResults } from "../../context/searchResults";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [newresults, setNewResults] = useState(null);
    const {searchResults} = useSearchResults();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1); 
        } else {
            navigate("/");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        try {
            const response = await get(`search/profiles/${query}`);
            setNewResults(response.data.profiles);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <main className="search-page">
            
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: "500px",
                marginBottom: "20px"
            }}>
                <button onClick={handleGoBack}><ArrowBack/></button>
                <h2 style={{ margin: 0 }}>Search results</h2>
            </div>
            
            <Card style={{ width: "500px", margin: "0 auto", textAlign: "center" }}>
                <form onSubmit={handleSubmit} style={{ position: "relative", width: "100%" }}>
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
            </Card>

            {searchResults && (
                <div className ="results-section">
                <Card style={{ width: "500px", margin: "20px auto 0 auto" }}>
                    <p className="people">People</p>
                    {searchResults.length > 0 && newresults === null ? (
                        <ul>
                            {searchResults.slice(0, 10).map((student, index) => (
                                <li key={index} className="student-item">
                                    <UserIcon
                                        userId={student.id}
                                        initials={student.firstName.charAt(0) + student.lastName.charAt(0)}
                                        firstname={student.firstName}
                                        lastname={student.lastName}
                                        role={student.specialism}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : newresults !== null ? (
                            <ul>
                                {newresults.slice(0, 10).map((student, index) => (
                                    <li key={index} className="student-item">
                                        <UserIcon
                                            userId={student.id}
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
                </Card>
                </div>
            )}
            </div>
        </main>
    );
};

export default SearchPage;
