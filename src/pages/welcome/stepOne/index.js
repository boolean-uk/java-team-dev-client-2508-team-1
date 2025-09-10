import Popup from 'reactjs-popup';
import ProfileIcon from '../../../assets/icons/profileIcon';

import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';
import Card from '../../../components/card';







const StepOne = ({ data, setData, handleFileChange }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Basic info</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-profileimg">
          <p className="text-blue1">Photo</p>

          <div className="welcome-form-profileimg-input">
            {data.photo ? (
              <img
                src={data.photo}
                alt="profile photo"
                className="welcome-form-profileimg-input"
                style={{ width: '80px', marginTop: '10px'}}/>
            ) : ( <ProfileIcon colour="#28C846" background="#64DC78" />)}

            {data.photo ? ( 
              <Popup trigger={<button className="addHeadshot">Replace headshot</button>} modal>
                {close => (
                  <Card>
                    <div className="welcome-form-popup">
                      <h3 className='welcome-form-popup-wrapper'>Upload Photo</h3>
                      <p className='text-blue1'>Choose a file to upload your headshot</p>
                        <div className='welcome-form-popup-buttons'>
                          <button className="offwhite" onClick={() => close()}>Cancel</button>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id="contained-button-file"
                            onChange={(e) => handleFileChange(e, close)}/>
                          <label htmlFor="contained-button-file" className="upload-label">
                            Upload photo
                          </label>
                        </div>
                      </div>
                    </Card>
                  )}
              </Popup>) : (
               <Popup trigger={<button className="addHeadshot">Add headshot</button>} modal>
                  {close => (
                    <Card>
                    <div className="welcome-form-popup">
                      <h3 className='welcome-form-popup-wrapper'>Upload Photo</h3>
                      <p className='text-blue1'>Choose a file to upload your headshot</p>
                        <div className='welcome-form-popup-buttons'>
                          <button className="offwhite" onClick={() => close()}>Cancel</button>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id="contained-button-file"
                            onChange={(e) => handleFileChange(e, close)}/>
                          <label htmlFor="contained-button-file" className="upload-label">
                            Upload photo
                          </label>
                       </div>
                      
                      </div>
                    </Card>
                    )}
                </Popup>
            )}
          </div>

          <p className="welcome-form-profileimg-error">Please upload a valid image file</p>
        </div>
        <div className="welcome-form-inputs">
          <TextInput
            onChange={setData}
            value={data.firstName}
            name="firstName"
            label={'First Name*'}
            placeholder={'First Name'}
            required
          />
          <TextInput 
          onChange={setData} 
          value={data.lastName} 
          name="lastName" 
          label={'Last Name*'} 
          placeholder={'Last Name'}
          required />
           <TextInput
            onChange={setData}
            value={data.username}
            name="username"
            label={'Username*'}
            placeholder={'Username'}
            required
          />
          <TextInput
            onChange={setData}
            value={data.githubUsername}
            name="githubUsername"
            label={'GitHub Username'}
            placeholder={'GitHub Username'}
          />
          <p className="text-blue1">*Required</p>
        </div>
      </Form>
    </>
  );
};

export default StepOne;
