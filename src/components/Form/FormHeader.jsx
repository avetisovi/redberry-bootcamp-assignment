import React from 'react';

const FormHeader = ({ step, prevStep }) => {
  // disabling buttons on small screen when only one is shown
  const disableOnSmallScreen = () => {
    if (window.matchMedia('(max-width: 992px)').matches) {
      return true;
    }
    return false;
  };

  return (
    <div className="form__header">
      <div
        className={
          step === 1 ? 'form__header-steps one' : 'form__header-steps two'
        }
      >
        <button
          disabled={disableOnSmallScreen()}
          onClick={prevStep}
          className="form__header-step first"
        >
          თანამშრომლის ინფო
        </button>
        <button
          disabled={disableOnSmallScreen()}
          type="submit"
          form="coworker-info"
          className="form__header-step second"
        >
          ლეპტოპის მახასიათებლები
        </button>
      </div>
      <p className="step__counter">{step}/2</p>
    </div>
  );
};

export default FormHeader;
