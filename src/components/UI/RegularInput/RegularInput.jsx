import React from 'react';
import cl from './RegularInput.module.css';
import tickIcon from '../../../images/tick.svg';

const RegularInput = ({
  onChange,
  value,
  type = 'text',
  placeholder,
  img,
  validation
}) => {
  return (
    <div className={cl.wrapper}>
      <input
        required
        className={cl.input}
        {...{ onChange, value, type, placeholder }}
        {...validation}
      />
      {img ? (
        <img className={cl.img} src={img} alt="" />
      ) : (
        <img className={cl.tick} src={tickIcon} alt="valid" />
      )}
    </div>
  );
};

export default RegularInput;
