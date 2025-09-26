import { useState } from "react";
import { get } from "../../service/apiClient";
import Card from "../../components/card";
import TextInput from "../../components/form/textInput";
import SearchIcon from "../../assets/icons/searchIcon";
import './style.css';
import ArrowBack from "../../assets/icons/arrowBack";
import { useNavigate } from "react-router-dom";
import { useSearchResults } from "../../context/searchResults";
import UserIconTeacherView from "../../components/profile-icon-searchTeacherView";
import UserIconStudentView from "../../components/profile-icon-searchStudentView";
import { useUserRoleData } from "../../context/userRole.";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [newresults, setNewResults] = useState(null);
    const {searchResults} = useSearchResults();
    const navigate = useNavigate();
    const { token } = useAuth();
    

    // Safely decode token with fallback
    let decodedToken = {};
    try {
        if (token || localStorage.getItem('token')) {
        decodedToken = jwtDecode(token || localStorage.getItem('token')) || {};
        }
    } catch (error) {
        console.error('Invalid token in Dashboard:', error);
    }

    const  { userRole, setUserRole } = useUserRoleData();
      setUserRole(decodedToken.roleId)

    const handleGoBack = () => {
        navigate(-1);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        try {
            const response = await get(`search/profiles/${query}`);
            setNewResults(Array.isArray(response.data.profiles) ? response.data.profiles : []);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setNewResults([]); // fallback til tom array hvis feil
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
  <div className="results-section">
    <Card style={{ width: "500px", margin: "20px auto 0 auto" }}>
      <p className="people">People</p>

      {(() => {
        const resultsToShow = newresults ?? searchResults;

        return resultsToShow.length > 0 ? (
          <ul>
            {resultsToShow.slice(0, 10).map((student, index) => (
              <li key={index} className="student-item">
                {userRole === 1 ? (
                  <UserIconTeacherView
                    photo={student.photo}
                    userId={student.id}
                    initials={student.firstName.charAt(0) + student.lastName.charAt(0)}
                    firstname={student.firstName}
                    lastname={student.lastName}
                    role={student.specialism}
                  />
                ) : userRole === 2 ? (
                  <UserIconStudentView
                    photo={student.photo}
                    userId={student.id}
                    initials={student.firstName.charAt(0) + student.lastName.charAt(0)}
                    firstname={student.firstName}
                    lastname={student.lastName}
                    role={student.specialism}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p>Sorry, no results found</p>
        );
      })()}
    </Card>
  </div>
)}


            </div>
        </main>
    );
};

export default SearchPage;
