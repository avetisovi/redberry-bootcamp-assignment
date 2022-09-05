import React, { useEffect, useContext, useState } from 'react';
import { ServerErrorContext } from '../../../context';
import cautionMark from '../../../images/caution.svg';

import cl from './ServerError.module.css';

const ServerError = () => {
  const { errorText, serverError, setServerError } =
    useContext(ServerErrorContext);

  const [wrapperClasses, setWrapperClasses] = useState([cl.wrapper]);

  useEffect(() => {
    if (serverError) {
      setWrapperClasses([cl.wrapper, cl.animate]);

      setTimeout(() => {
        setServerError(false);
      }, 3000);
    } else {
      setWrapperClasses([cl.wrapper]);
    }
  }, [serverError]);

  return (
    <div className={wrapperClasses.join(' ')}>
      <img className={cl.img} src={cautionMark} alt="" />
      <p className={cl.text}>{errorText}</p>
    </div>
  );
};

export default ServerError;
