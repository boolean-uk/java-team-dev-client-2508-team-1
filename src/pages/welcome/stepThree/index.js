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
                    label={'Role'}
                    value={'Student'}
                    readOnly={true}
                />
                <TextInput 
                    name="specialism" 
                    label={'Specialism'} 
                    value={'Software Developer'}
                    readOnly={true}
                />
                <TextInput
                    name="cohort"
                    label={'Cohort'}
                    value={'Cohort 4'}
                    readOnly={true}
                />
                <TextInput
                    name="start_date"
                    label={'Start Date'}
                    value={'August 2025'}
                    readOnly={true}
                />
                <TextInput
                    name="end_date"
                    label={'End Date'}
                    value={'December 2025'}
                    readOnly={true}
                />
            </div>
        </Form>
        </>
    )
}

export default StepThree;