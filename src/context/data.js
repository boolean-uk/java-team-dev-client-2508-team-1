import { createContext, useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { get } from "../service/apiClient";
import jwtDecode from "jwt-decode";

// Roller
const ROLES = {
  TEACHER: "ROLE_TEACHER",
  STUDENT: "ROLE_STUDENT"
};

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [cohorts, setCohorts] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [myCohort, setMyCohort] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [teachersInMyCohort, setTeachersInMyCohort] = useState([]);
  const [studentsInMyCohort, setStudentsInMyCohort] = useState([]);

  const { token, refresh } = useAuth();
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState(2);
  

  // 1. Hent bruker-ID når token er tilgjengelig
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
        setUserRole(decodedToken.roleId);
        console.log("User role ID:", decodedToken.roleId);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      // Logout: nullstill state
      setUserId("");
      setUserRole(2);
      setCohorts([]);
      setStudents([]);
      setTeachers([]);
      setCourses([]);
      setMyCohort(null);
      setMyProfile(null);
      setTeachersInMyCohort([]);
      setStudentsInMyCohort([]);
    }
  }, [token]);

  // 2. Hent data ved aktiv token
  useEffect(() => {
    if (!token) return;

    const fetchCohorts = async () => {
      try {
        const response = await get("cohorts");
        setCohorts(response.data.cohorts);
      } catch (error) {
        console.error("Error fetching cohorts:", error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await get("students");
        const studentData = response.data.profiles;
        setStudents(studentData);
        console.log("Fetched students:", studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await get("teachers");
        const teacherData = Array.isArray(response.data.profiles)
          ? response.data.profiles
          : [];
        setTeachers(teacherData);
      } catch (error) {
        console.error("Error fetching teachers: ", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await get("courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCohorts();
    fetchStudents();
    fetchTeachers();
    fetchCourses();
  }, [token, refresh]);

  // 3. Finn min cohort og profil
  useEffect(() => {
    if (userId && cohorts.length > 0) {
      const cohort = cohorts.find(
        c =>
          Array.isArray(c.profiles) &&
          c.profiles.some(p => p.user.id === userId)
      );

      if (cohort) {
        const profile = cohort.profiles.find(p => p.user.id === userId);
        setMyCohort(cohort);
        setMyProfile(profile);
        console.log("Cohort:", cohort);
        console.log("Profile:", profile);
      } else {
        console.warn("Ingen cohort funnet for userId:", userId);
        setMyCohort(null);
        setMyProfile(null);
      }
    }
  }, [userId, cohorts]);

  // 4. Filtrer lærere og studenter i min cohort
  useEffect(() => {
    if (myCohort?.profiles) {
      const teachers = myCohort.profiles.filter(
        profile => profile.role.name === ROLES.TEACHER
      );
      const students = myCohort.profiles.filter(
        profile => profile.role.name === ROLES.STUDENT
      );
      setTeachersInMyCohort(teachers);
      setStudentsInMyCohort(students);
      console.log("Teachers in my cohort:", teachers);
      console.log("Students in my cohort:", students);
    }
  }, [myCohort]);

  return (
    <DataContext.Provider
      value={{
        cohorts,
        students,
        teachers,
        courses,
        setCohorts,
        userId,
        myProfile,
        myCohort,
        teachersInMyCohort,
        studentsInMyCohort,
        userRole
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
