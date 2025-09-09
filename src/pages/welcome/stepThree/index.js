import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const StepThree = ({ data, setData }) => {


    return (
        <>
        <div className='welcome-formheader'>
            <h3>Training info</h3>
        </div>
        <Form className="welcome-form">
            <div className='welcome-form-inputs'>
               <TextInput
                    name="role"
                    label={'Role*'}
                    value={'Student'}
                />
                <TextInput 
                    name="specialism" 
                    label={'Specialism*'} 
                    value={'Software Developer'}
                />
                <TextInput
                    name="cohort"
                    label={'Cohort*'}
                    value={'Cohort 4'}
                />
                <TextInput
                    name="startDate"
                    label={'Start Date*'}
                    value={'August 2025'}
                />
                <TextInput
                    name="endDate"
                    label={'End Date*'}
                    value={'December 2025'}
                />
                <p className="text-blue1">*Required</p>
            </div>
        </Form>
        </>
    )
}

export default StepThree;