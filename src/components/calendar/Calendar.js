
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ label, selectedDate, onChange, placeholder }) => {
  return (
    <div className="inputwrapper" >
      {label && <label>{label}</label>}
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat="dd-MM-yyyy"
        className="datepicker-input" // For styling
      />
    </div>
  );
};

export default Calendar;