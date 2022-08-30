import React from 'react';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';

const CoworkerInfoTop = ({ values, setValues }) => {
  return (
    <div className="coworker-info__top form__two-elems">
      <InputWithLabelAndHint
        label="სახელი"
        hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
        placeholder="გრიშა"
        validation={{ pattern: '[ა-ჰ]{2,}' }}
        value={values.firstName}
        onChange={setValues.setFirstName}
        name="name"
      />
      <InputWithLabelAndHint
        label="გვარი"
        hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
        placeholder="ბაგრატიონი"
        validation={{ pattern: '[ა-ჰ]{2,}' }}
        value={values.lastName}
        onChange={setValues.setLastName}
        name="surname"
      />
    </div>
  );
};

export default CoworkerInfoTop;
