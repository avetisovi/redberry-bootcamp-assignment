import React, { useEffect, useState } from 'react';
import InputWithLabelAndHint from './UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from './UI/RegularDropdown/Dropdown';
import { isObjectEmpty } from '../utils';

import { fetchOptions } from '../utils';

const CoworkerInfo = ({ nextStep, values, setValues }) => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [posOptions, setPosOptions] = useState([]);
  const [teamDropdownAlert, setTeamDropdownAlert] = useState(false);
  const [posDropdownAlert, setPosDropdownAlert] = useState(false);

  useEffect(() => {
    fetchOptions('https://pcfy.redberryinternship.ge/api/teams').then((res) =>
      setTeamOptions(res)
    );

    fetchOptions('https://pcfy.redberryinternship.ge/api/positions').then(
      (res) => setPosOptions(res)
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isObjectEmpty(values.team)) {
      setTeamDropdownAlert(true);
    } else if (isObjectEmpty(values.position)) {
      setPosDropdownAlert(true);
    } else {
      setTeamDropdownAlert(false);
      setPosDropdownAlert(false);
      nextStep();
    }
  };

  return (
    <form className="coworker-info" onSubmit={handleSubmit}>
      <div className="coworker-info__top">
        <InputWithLabelAndHint
          label="სახელი"
          hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
          placeholder="გრიშა"
          validation={{ pattern: '[ა-ჰ]{2,}' }}
          value={values.firstName}
          onChange={setValues.setFirstName}
          name="firstName"
        />
        <InputWithLabelAndHint
          label="გვარი"
          hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
          placeholder="ბაგრატიონი"
          validation={{ pattern: '[ა-ჰ]{2,}' }}
          value={values.lastName}
          onChange={setValues.setLastName}
          name="lastName"
        />
      </div>
      <Dropdown
        placeholder="თიმი"
        options={teamOptions}
        setValue={setValues.setTeam}
        value={values.team}
        alert={teamDropdownAlert}
        setAlert={setTeamDropdownAlert}
      />
      <Dropdown
        disabled={isObjectEmpty(values.team)}
        placeholder="პოზიცია"
        options={posOptions.filter((opt) => opt.team_id === values.team.id)}
        setValue={setValues.setPosition}
        value={values.position}
        alert={posDropdownAlert}
        setAlert={setPosDropdownAlert}
      />
      <InputWithLabelAndHint
        label="მეილი"
        hint="უნდა მთავრდებოდეს @redberry.ge-ით"
        placeholder="grish666@redberry.ge"
        validation={{ pattern: '[a-z0-9._%+-]+@redberry+.ge$' }}
        value={values.email}
        onChange={setValues.setEmail}
        type="email"
      />
      <InputWithLabelAndHint
        label="ტელეფონის ნომერი"
        hint="უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
        placeholder="+995 598 00 07 01"
        validation={{ pattern: '^\\+995(\\s?[0-9]){9}' }}
        value={values.phoneNumber}
        onChange={setValues.setPhoneNumber}
        type="tel"
      />
      <button className="coworker-info__btn">შემდეგი</button>
    </form>
  );
};

export default CoworkerInfo;
