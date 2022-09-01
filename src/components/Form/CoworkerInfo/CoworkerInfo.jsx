import React, { useEffect, useState } from 'react';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from '../../UI/RegularDropdown/Dropdown';
import CoworkerInfoTop from './CoworkerInfoTop';
import { isObjectEmpty, fetchData } from '../../../utils';

const CoworkerInfo = ({ nextStep, values, setValues, setCoworkerData }) => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [posOptions, setPosOptions] = useState([]);
  const [teamDropdownAlert, setTeamDropdownAlert] = useState(false);
  const [posDropdownAlert, setPosDropdownAlert] = useState(false);

  useEffect(() => {
    fetchData('https://pcfy.redberryinternship.ge/api/teams').then(
      setTeamOptions
    );

    fetchData('https://pcfy.redberryinternship.ge/api/positions').then(
      setPosOptions
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

      const data = new FormData(e.target);
      data.append('team_id', values.team.id);
      data.append('position_id', values.position.id);
      console.log(values.laptopImg);
      setCoworkerData(data);
      nextStep();
    }
  };

  return (
    <form className="coworker-info" onSubmit={handleSubmit}>
      <CoworkerInfoTop {...{ values, setValues }} />
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
        name="email"
      />
      <InputWithLabelAndHint
        label="ტელეფონის ნომერი"
        hint="უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
        placeholder="+995 598 00 07 01"
        validation={{ pattern: '^\\+995(\\s?[0-9]){9}' }}
        value={values.phoneNumber}
        onChange={setValues.setPhoneNumber}
        type="tel"
        name="phone_number"
      />
      <button className="coworker-info__btn">შემდეგი</button>
    </form>
  );
};

export default CoworkerInfo;
