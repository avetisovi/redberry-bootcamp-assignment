import React from 'react';

const LaptopInfo = ({ prevStep, handleConfirmation }) => {
  return (
    <div>
      <button onClick={prevStep}>უკან</button>
      <button onClick={handleConfirmation}>დამახსოვრება</button>
    </div>
  );
};

export default LaptopInfo;
