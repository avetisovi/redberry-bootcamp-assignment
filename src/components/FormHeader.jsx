import React from 'react';

const FormHeader = ({ step }) => {
  return (
    <div className="form__header">
      <div
        className={
          step === 1 ? 'form__header-steps one' : 'form__header-steps two'
        }
      >
        <p className="form__step">თანამშრომლის ინფო</p>
        <p className="form__step">ლეპტოპის მახასიათებლები</p>
      </div>
    </div>
  );
};

export default FormHeader;
