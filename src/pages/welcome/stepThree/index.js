import { useState } from 'react';
import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';
import DropdownMenu from '../../../components/dropdown';
import { getRoles } from '@testing-library/react';

const StepThree = ({ data, setData }) => {

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedSpecialism, setSelectedSpecialism] = useState("");
    const [selectedCohort, setSelectedCohort] = useState("");

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
                <TextInput
                    onChange={setData}
                    value={data.startDate}
                    name="startDate"
                    label={"Start Date*"}
                />
                <TextInput
                    onChange={setData}
                    value={data.endDate}
                    name="endDate"
                    label={"End Date*"}
                />
                <p className="text-blue1">*Required</p>
            </div>
        </Form>
        </>
    )
}

export default StepThree;