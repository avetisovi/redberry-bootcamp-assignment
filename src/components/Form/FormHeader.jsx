import React from 'react';

const FormHeader = ({ step }) => {
  return (
    <div className="form__header">
      <div
        className={
          step === 1 ? 'form__header-steps one' : 'form__header-steps two'
        }
      >
        <p className="form__header-step first">თანამშრომლის ინფო</p>
        <p className="form__header-step second">ლეპტოპის მახასიათებლები</p>
      </div>
      <p className="step__counter">{step}/2</p>
    </div>
  );
};

export default FormHeader;
