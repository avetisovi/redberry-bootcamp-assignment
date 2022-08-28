import React from 'react';

import cl from './RegularRadioInput.module.css';

const RegularRadioInput = ({ title, name, options }) => {
  return (
    <div className={cl.wrapper}>
      <p className={cl.title}>{title}</p>
      <ul className={cl.list}>
        {options.map((opt) => (
          <li className={cl.listItem} key={opt.id}>
            <input className={cl.input} type="radio" id={opt.id} name={name} />
            <label className={cl.label} htmlFor={opt.id}>
              {opt.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegularRadioInput;
