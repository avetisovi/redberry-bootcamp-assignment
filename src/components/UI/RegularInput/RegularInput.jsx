import React from 'react';
import cl from './RegularInput.module.css';
import { formatDate } from '../../../utils';

const RegularInput = ({ onChange, value, type = 'text', placeholder }) => {
  return (
    <input className={cl.input} {...{ onChange, value, type, placeholder }} />
  );
};

export default RegularInput;
