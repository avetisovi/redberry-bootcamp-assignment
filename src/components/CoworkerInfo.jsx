import React, { useEffect, useState } from 'react';
import InputWithLabelAndHint from './UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from './UI/RegularDropdown/Dropdown';

import { fetchOptions } from '../utils';

const CoworkerInfo = ({ nextStep, values, setValues }) => {
  const [teamOptions, setTeamOptions] = useState([]);

  useEffect(() => {
    fetchOptions('https://pcfy.redberryinternship.ge/api/teams').then((res) =>
      setTeamOptions(res)
    );
  }, []);

  return (
    <form className="coworker-info">
      <div className="coworker-info__top">
        <InputWithLabelAndHint
          label="სახელი"
          hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
          placeholder="გრიშა"
        />
        <InputWithLabelAndHint
          label="გვარი"
          hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
          placeholder="ბაგრატიონი"
        />
      </div>
      <Dropdown placeholder="თიმი" options={teamOptions} />
      <InputWithLabelAndHint
        label="მეილი"
        hint="უნდა მთავრდებოდეს @redberry.ge-ით"
        placeholder="grish666@redberry.ge"
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
