
const NumberInput = ({ value, onChange, name, label, icon, type = 'number'}) => {
  
    return (
      <div className="inputwrapper">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={icon && 'input-has-icon'}
          placeholder="Enter numbers only" 

          onInput={(e) => {
            if (e.target.value.length > 8) {
                e.target.value = e.target.value.slice(0, 8);
              }}}
        />
        {icon && <span className="input-icon">{icon}</span>}
      </div>
    );
  }

export default NumberInput;