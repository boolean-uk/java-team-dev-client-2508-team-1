import { useEffect, useState } from 'react';
import Form from '../../../../components/form';
import TextInput from '../../../../components/form/textInput';
import { get } from '../../../../service/apiClient';
import ArrowDownIcon from '../../../../assets/icons/arrowDownIcon';
import CoursesMenu from '../../../addStudent/coursesMenu';
import CohortsMenu from '../../../addStudent/cohortsMenu';

const NewStudentStepThree = ({ data, setData, setProfile }) => {

    const [ courses, setCourses ] = useState([])
    const [ cohorts, setCohorts ] = useState([])

    const [ isOpenCourses, setIsOpenCourses ] = useState(false);
    const [ isOpenCohorts, setIsOpenCohorts ] = useState(false);

    const [ selectedCourse, setSelectedCourse ] = useState(null)
    const [ selectedCohort, setSelectedCohort ] = useState(null)

     useEffect(() => {
   
    async function fetchCourses() {
        try {
            const response = await get("courses");
            console.log(response)
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }
    fetchCourses()
    }, []);


    const handleSelectCourse = (course) => {
    console.log("selected course" + course)
    setIsOpenCourses(false)
    setSelectedCourse(course)
    setCohorts(course.cohorts)

    setProfile(prev => ({
        ...prev,
        specialism: course?.name,
        start_date: course?.startDate,
        end_date: course?.endDate,
    }));
  }

   const handleSelectCohort = (cohort) => {
    console.log("selected course" + cohort)
    setIsOpenCohorts(false)
    setSelectedCohort(cohort)

    setProfile(prev => ({
        ...prev,
        cohort: cohort?.id
    }));
  }

    return (
        <>
        <div className='welcome-formheader'>
            <h3>Training info</h3>
        </div>
        <Form className="welcome-form">
            <div className='welcome-form-inputs'>
               <TextInput
                    name="role"
                    label={'Role'}
                    value={'Student'}
                    readOnly={true}
                />
                <div className="select-course-button">
                    <label className="the-label">Specialism*</label>
                    <button className="the-label" onClick={() => setIsOpenCourses(!isOpenCourses)}>
                        {selectedCourse 
                        ? <span className="select-course-title-selected">{selectedCourse.name}</span>
                        : <span className="select-course-title">Select a course</span>}
                        <ArrowDownIcon/>
                    </button>

                    {isOpenCourses && (<CoursesMenu courses={courses} onSelect={handleSelectCourse}/>)}
                </div>
                <div className="select-cohort-button">
                    <label className="the-label">Cohort*</label>
                    <button  onClick={() => setIsOpenCohorts(true)}>
                            {selectedCohort !== null ? (<span className="select-cohort-title-selected">Cohort {selectedCohort.id}</span>
                            ):( <span className="select-cohort-title">Select a cohort</span>)}
            
                            <ArrowDownIcon/>
                        </button> 
                </div>

                {isOpenCohorts && (<CohortsMenu cohorts={cohorts} onSelect={handleSelectCohort}/>)}
                <TextInput
                    onChange={setData}
                    name="start_date"
                    label="Start Date"
                    placeholder=""
                    value={selectedCourse?.startDate || ''}
                    readOnly
                    required
                />
                {console.log("Start date:", selectedCourse?.startDate)}

                <TextInput
                    onChange={setData}
                    name="end_date"
                    label="End Date"
                    placeholder=""
                    value={selectedCourse?.startDate || ''}
                    readOnly
                    required
                />
                 {console.log("End date:", selectedCourse?.endDate)}
            </div>
        </Form>
        </>
    )
}

export default NewStudentStepThree;