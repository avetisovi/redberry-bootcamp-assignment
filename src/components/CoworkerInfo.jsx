import React, { useEffect, useState } from 'react';
import InputWithLabelAndHint from './UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from './UI/RegularDropdown/Dropdown';

import { fetchOptions } from '../utils';

const CoworkerInfo = ({ nextStep, values, setValues }) => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [posOptions, setPosOptions] = useState([]);

  useEffect(() => {
    fetchOptions('https://pcfy.redberryinternship.ge/api/teams').then((res) =>
      setTeamOptions(res)
    );

    fetchOptions('https://pcfy.redberryinternship.ge/api/positions').then(
      (res) => setPosOptions(res)
    );
  }, []);

  return (
    <form className="coworker-info">
      <div className="coworker-info__top">
        <InputWithLabelAndHint
          label="სახელი"
          hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
          placeholder="გრიშა"
          validation={{ pattern: '[ა-ჰ]{2,}' }}
          value={values.firstName}
          onChange={(e) => setValues.setFirstName(e.target.value)}
        />
        <InputWithLabelAndHint
          label="გვარი"
          hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
          placeholder="ბაგრატიონი"
          validation={{ pattern: '[ა-ჰ]{2,}' }}
          value={values.lastName}
          onChange={(e) => setValues.setLastName(e.target.value)}
        />
      </div>
      <Dropdown
        placeholder="თიმი"
        options={teamOptions}
        setValue={setValues.setTeam}
      />
      <Dropdown
        disabled={!values.team}
        placeholder="პოზიცია"
        options={posOptions.filter((opt) => opt.team_id === values.team.id)}
        setValue={setValues.setPosition}
      />
      <InputWithLabelAndHint
        label="მეილი"
        hint="უნდა მთავრდებოდეს @redberry.ge-ით"
        placeholder="grish666@redberry.ge"
        // validation={{ pattern: 'ge$' }}
        value={values.email}
        onChange={(e) => setValues.setEmail(e.target.value)}
        type="email"
      />
      <InputWithLabelAndHint
        label="ტელეფონის ნომერი"
        hint="უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
        placeholder="+995 598 00 07 01"
      />
      <button className="coworker-info__btn" onClick={nextStep}>
        შემდეგი
      </button>
    </form>
  );
};

export default CoworkerInfo;
