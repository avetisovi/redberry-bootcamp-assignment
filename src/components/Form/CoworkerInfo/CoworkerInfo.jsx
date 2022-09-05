import React, { useEffect, useState, useContext } from 'react';
import InputWithLabelAndHint from '../UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from '../UI/RegularDropdown/Dropdown';
import CoworkerInfoTop from './CoworkerInfoTop';
import { isObjectEmpty, getData } from '../../../utils';
import { FormValuesContext, ServerErrorContext } from '../../../context';

const CoworkerInfo = ({ nextStep, setCoworkerData }) => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [posOptions, setPosOptions] = useState([]);

  const [firstNameAlert, setFirstNameAlert] = useState(false);
  const [lastNameAlert, setLastNameAlert] = useState(false);
  const [teamDropdownAlert, setTeamDropdownAlert] = useState(false);
  const [posDropdownAlert, setPosDropdownAlert] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [phoneNumberAlert, setPhoneNumberAlert] = useState(false);

  const { values, setValues } = useContext(FormValuesContext);

  const { setServerError, setErrorText } = useContext(ServerErrorContext);

  // fetching teams and options
  useEffect(() => {
    getData('https://pcfy.redberryinternship.ge/api/teams').then((res) => {
      if (res.ok) {
        res.json().then((res) => setTeamOptions(res.data));
      } else {
        setServerError(true);
        setErrorText(res.statusText);
      }
    });

    getData('https://pcfy.redberryinternship.ge/api/positions').then((res) => {
      if (res.ok) {
        res.json().then((res) => setPosOptions(res.data));
      } else {
        setServerError(true);
        setErrorText(res.statusText);
      }
    });
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

    // values of form's first step
    const coworkerValues = [
      values.firstName,
      values.lastName,
      values.team,
      values.position,
      values.email,
      values.phoneNumber
    ];

    // not filled
    const emptyValues = coworkerValues.filter(
      (value) => isObjectEmpty(value) || value === ''
    );

    // checking everything is filled
    if (!emptyValues.length) {
      const data = new FormData(e.target);
      data.append('team_id', values.team.id);
      data.append('position_id', values.position.id);
      setCoworkerData(data);
      nextStep();

      return;
    }

    // setting alert for not filled inputs and dropdowns
    if (!values.firstName) {
      setFirstNameAlert(true);
    }

    if (!values.lastName) {
      setLastNameAlert(true);
    }

    if (isObjectEmpty(values.team)) {
      setTeamDropdownAlert(true);
    }

    if (isObjectEmpty(values.position)) {
      setPosDropdownAlert(true);
    }

    if (!values.email) {
      setEmailAlert(true);
    }

    if (!values.phoneNumber) {
      setPhoneNumberAlert(true);
    }
  };

  document.querySelector('body').style.overflow = 'auto';
  document.querySelector('html').style.overflow = 'auto';

  return (
    <form className="coworker-info" onSubmit={handleSubmit} id="coworker-info">
      <CoworkerInfoTop
        {...{
          firstNameAlert,
          setFirstNameAlert,
          lastNameAlert,
          setLastNameAlert
        }}
      />
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
        alert={emailAlert}
        setAlert={setEmailAlert}
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
        alert={phoneNumberAlert}
        setAlert={setPhoneNumberAlert}
      />
      <button className="coworker-info__btn">შემდეგი</button>
    </form>
  );
};

export default CoworkerInfo;
