import Form from '../../../../components/form';
import TextInput from '../../../../components/form/textInput';

const NewStudentStepThree = ({ data, setData }) => {


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
                    onChange={setData}
                    value={data.specialism}
                    name="specialism" 
                    label={'Specialism'} 
                    placeholder={'Specialism'}
                    // Sette inn rulle meny her
                    required
                />
                <TextInput
                    onChange={setData}
                    name="cohort"
                    label={'Cohort'}
                    value={data.cohort}
                    placeholder={'Cohort'}
                    required
                />
                <TextInput
                    name="start_date"
                    label={'Start Date'}
                    value={'August 2025'}
                    required
                />
                <TextInput
                    name="end_date"
                    label={'End Date'}
                    value={'December 2025'}
                    required
                />
            </div>
        </Form>
        </>
    )
}

export default NewStudentStepThree;