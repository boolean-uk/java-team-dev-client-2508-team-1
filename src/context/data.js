import { createContext, useContext, useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { get } from "../service/apiClient"
import jwtDecode from "jwt-decode";

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [cohorts, setCohorts] = useState([])
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])
  
  const [myCohort, setMyCohort] = useState([])
  const [myProfile, setMyProfile] = useState([])
  const [teachersInMyCohort, setTeachersInMyCohort] = useState([])
  const [studentsInMyCohort, setStudentsInMyCohort] = useState([])

  const { token, refresh } = useAuth()
  const [userId, setUserId] = useState("")


  // 1. Hent bruker-ID når token er tilgjengelig
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        setUserId(decodedToken.userId)
        console.log("User ID:", decodedToken.userId)
      } catch (error) {
        console.error("Invalid token:", error)
      }
    } else {
      setUserId("")
    //   setCohorts([])
    //   setStudents([])
    //   setTeachers([])
    //   setMyCohort([])
    //   setMyProfile([])
    //   setTeachersInMyCohort([])
    }
  }, [token])

  // 2. Hent cohorts når token er tilgjengelig
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const response = await get("cohorts")
        setCohorts(response.data.cohorts)
      } catch (error) {
        console.error("Error fetching cohorts:", error)
      }
    }

    const fetchStudents = async () => {
        try {
            const response = await get("students")
            setStudents(response.data.profiles)
        } catch (error) {
            console.error("Error fetching students:", error)
        }
    }

    const fetchTeachers = async () => {
          try {
                const response = await get("teachers")
                setTeachers(Array.isArray(response.data.profiles) ? response.data.profiles : [])
            } catch (error) {
                console.error("Error fetching teachers: ", error)
            }
    }

    const fetchCourses = async () => {
        try {
            const response = await get("courses");
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }
    

    if (token) {
      fetchCohorts()
      fetchStudents()
      fetchTeachers()
      fetchCourses()
    }
  }, [token, refresh])

  // 3. Når både userId og cohorts er tilgjengelig, finn profil og cohort
 useEffect(() => {
  if (userId && cohorts.length > 0) {
    const cohort = cohorts.find(c =>
      c.profiles.some(p => p.user.id === userId)
    )

    if (cohort) {
      const profile = cohort.profiles.find(p => p.user.id === userId)
      setMyCohort(cohort)
      setMyProfile(profile)
      console.log("Cohort:", cohort)
      console.log("Profile:", profile)
    } else {
        console.warn("Ingen cohort funnet for userId:", userId)
        setMyCohort(null)
        setMyProfile(null)
    }
  }
}, [userId, cohorts])

  // 4. Når myCohort er satt, filtrer ut lærere
  useEffect(() => {
    if (myCohort && myCohort.profiles) {
      const teachers = myCohort.profiles.filter(
        profile => profile.role.name === "ROLE_TEACHER"
      )
      const students = myCohort.profiles.filter(
        profile => profile.role.name === "ROLE_STUDENT"
      )
      setTeachersInMyCohort(teachers)
      setStudentsInMyCohort(students)
      console.log("Teachers in my cohort:", teachers)
      console.log("students", students)
    }
  }, [myCohort])

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
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
