import { useState } from 'react';
import Form from '../../../components/form';
import DropdownMenu from '../../../components/dropdown';
import { getRoles } from '@testing-library/react';
import Calendar from '../../../components/calendar/Calendar';

const StepThree = ({ data, setData }) => {

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedSpecialism, setSelectedSpecialism] = useState("");
    const [selectedCohort, setSelectedCohort] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const cohorts = [{value:"c1", label:"c1"}, {value:"c2", label:"c2"}];
    const specialisms = [{value:"s1", label:"s1"}, {value:"s2", label:"s2"}];
    return (
        <>
        <div className='welcome-formheader'>
            <h3>Training info</h3>
        </div>
        <Form className="welcome-form">
            <div className='welcome-form-inputs'>
                <DropdownMenu
                    options={getRoles}
                    value={selectedRole}
                    onChange={setSelectedRole}
                    placeholder='Role*'
                />
                <DropdownMenu
                    options={specialisms}
                    value={selectedSpecialism}
                    onChange={setSelectedSpecialism}
                    placeholder='Specialism*'
                />
                <DropdownMenu
                    options={cohorts}
                    value={selectedCohort}
                    onChange={setSelectedCohort}
                    placeholder='Cohorts*'
                />
                <Calendar 
                    label="Start Date*"
                    selectedDate={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholder="Start Date" 
                />
                <Calendar 
                    label="End Date*"
                    selectedDate={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholder="End Date" 
                />
                <p className="text-blue1">*Required</p>
            </div>
        </Form>
        </>
    )
}

export default StepThree;