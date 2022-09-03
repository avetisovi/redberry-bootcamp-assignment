import React from 'react';
import cl from './DateInput.module.css';

const DateInput = ({
  label,
  name,
  setValue,
  value,
  placeholder,
  valueName
}) => {
  const handleChange = (e) => {
    setValue(e.target.value);
    localStorage.setItem(valueName, e.target.value);
  };

  return (
    <div className={cl.wrapper}>
      <label className={cl.label} htmlFor={name}>
        {label}
      </label>
      <input
        onChange={handleChange}
        id={name}
        className={cl.input}
        onFocus={(e) => (e.target.type = 'date')}
        onBlur={(e) => (e.target.type = 'text')}
        {...{ value, placeholder, name }}
      />
    </div>
  );
};

export default DateInput;
