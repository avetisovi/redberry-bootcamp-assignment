import React, { useContext } from 'react';
import { FormValuesContext } from '../../../context';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';

const CoworkerInfoTop = () => {
  const { values, setValues } = useContext(FormValuesContext);

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
        valueName="firstName"
      />
      <InputWithLabelAndHint
        label="გვარი"
        hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
        placeholder="ბაგრატიონი"
        validation={{ pattern: '[ა-ჰ]{2,}' }}
        value={values.lastName}
        onChange={setValues.setLastName}
        name="surname"
        valueName="lastName"
      />
    </div>
  );
};

export default CoworkerInfoTop;
