import React, { useEffect, useState } from 'react';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from '../../UI/RegularDropdown/Dropdown';
import CoworkerInfoTop from './CoworkerInfoTop';
import { isObjectEmpty, getData } from '../../../utils';
import CoworkerInfoPopup from './CoworkerInfoPopup';

const CoworkerInfo = ({ nextStep, values, setValues, setCoworkerData }) => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [posOptions, setPosOptions] = useState([]);
  const [teamDropdownAlert, setTeamDropdownAlert] = useState(false);
  const [posDropdownAlert, setPosDropdownAlert] = useState(false);
  const [usersWithLaptops, setUsersWithLaptops] = useState([]);
  const [userHasLaptop, setUserHasLaptop] = useState(false);

  // fetching teams, options and users with laptop
  useEffect(() => {
    getData('https://pcfy.redberryinternship.ge/api/teams').then(
      setTeamOptions
    );

    getData('https://pcfy.redberryinternship.ge/api/positions').then(
      setPosOptions
    );

    getData(
      `https://pcfy.redberryinternship.ge/api/laptops?token=${process.env.REACT_APP_TOKEN}`
    ).then((res) => setUsersWithLaptops(res.map((item) => item.user)));
  }, []);

  // reset position when team is changed
  useEffect(() => {
    if (values.position.team_id !== values.team.id) {
      setValues.setPosition({});
    }
  }, [values.team]);

  // submitting form and going to next step
  const handleSubmit = (e) => {
    e.preventDefault();

    // checking for validity
    if (isObjectEmpty(values.team)) {
      setTeamDropdownAlert(true);
    } else if (isObjectEmpty(values.position)) {
      setPosDropdownAlert(true);
    } else if (
      // checks if user already has laptop
      usersWithLaptops.find(
        (user) =>
          user.name === values.firstName && user.surname === values.lastName
      )
    ) {
      window.scrollTo(0, 0);
      setUserHasLaptop(true);
    } else {
      // save data and go to next step if data is valid
      setTeamDropdownAlert(false);
      setPosDropdownAlert(false);
      const data = new FormData(e.target);
      data.append('team_id', values.team.id);
      data.append('position_id', values.position.id);
      setCoworkerData(data);
      nextStep();
    }
  };

  // disabling scroll when popup is shown
  userHasLaptop
    ? (document.querySelector('body').style.overflow = 'hidden')
    : (document.querySelector('body').style.overflow = 'auto');

  return (
    <form className="coworker-info" onSubmit={handleSubmit} id="coworker-info">
      <CoworkerInfoTop {...{ values, setValues }} />
      <Dropdown
        placeholder="თიმი"
        options={teamOptions}
        setValue={setValues.setTeam}
        value={values.team}
        alert={teamDropdownAlert}
        setAlert={setTeamDropdownAlert}
        valueName="team"
      />
      <Dropdown
        disabled={isObjectEmpty(values.team)}
        placeholder="პოზიცია"
        options={posOptions.filter((opt) => opt.team_id === values.team.id)}
        setValue={setValues.setPosition}
        value={values.position}
        alert={posDropdownAlert}
        setAlert={setPosDropdownAlert}
        valueName="position"
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
        valueName="email"
      />
      <InputWithLabelAndHint
        label="ტელეფონის ნომერი"
        hint="უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
        placeholder="+995 598 00 07 01"
        validation={{ pattern: '^\\+995([0-9]){9}' }}
        value={values.phoneNumber}
        onChange={setValues.setPhoneNumber}
        type="tel"
        name="phone_number"
        valueName="phoneNumber"
      />
      <button className="coworker-info__btn">შემდეგი</button>
      {userHasLaptop && <CoworkerInfoPopup setVisible={setUserHasLaptop} />}
    </form>
  );
};

export default CoworkerInfo;
