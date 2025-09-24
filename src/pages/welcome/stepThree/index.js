import { useEffect, useState } from 'react';
import LockIcon from '../../../assets/icons/lockIcon';
import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';
import { get } from '../../../service/apiClient';

const StepThree = ({ data, setData, setProfile }) => {

    // Random generated
    // Hente en Specialism: Software Engineering
    // Også hente en random Cohort fra den Specialism
    // Også fylle inn start date og end date fra den Cohort

    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
    async function fetchCourses() {
        try {
        const response = await get("courses");
        const allCourses = response.data.courses;

        if (allCourses.length > 0) {
            const randomIndex = Math.floor(Math.random() * allCourses.length);
            const randomCourse = allCourses[randomIndex];
            setSelectedCourse(randomCourse);

            setProfile(prev => ({
            ...prev,
            specialism: randomCourse.name,
            start_date: randomCourse.startDate,
            end_date: randomCourse.endDate,
            cohort: randomCourse.cohorts?.[0]?.id || null
            }));
        }
        } catch (error) {
        console.error("Error fetching courses:", error);
        }
    }

    fetchCourses();
    }, []);



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
                    icon={<LockIcon/>}
                    iconRight={true}
                />
                <TextInput 
                    name="specialism" 
                    label={'Specialism'} 
                    value={selectedCourse?.name}
                    readOnly={true}
                    icon={<LockIcon/>}
                    iconRight={true}
                />
                <TextInput
                    name="cohort"
                    label={'Cohort'}
                    value={selectedCourse?.cohorts?.[0]?.id}
                    readOnly={true}
                    icon={<LockIcon/>}
                    iconRight={true}
                />
                {console.log("Cohort: ", selectedCourse?.cohorts?.[0]?.id)}
                <TextInput
                    name="start_date"
                    label={'Start Date'}
                    value={selectedCourse?.startDate}
                    readOnly={true}
                    icon={<LockIcon/>}
                    iconRight={true}
                />
                <TextInput
                    name="end_date"
                    label={'End Date'}
                    value={selectedCourse?.endDate}
                    readOnly={true}
                    icon={<LockIcon/>}
                    iconRight={true}
                />
            </div>
        </Form>
        </>
    )
}

export default StepThree;
