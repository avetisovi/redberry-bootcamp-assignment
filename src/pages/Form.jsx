import React, { useState } from 'react';
import CoworkerInfo from '../components/Form/CoworkerInfo/CoworkerInfo';
import LaptopInfo from '../components/Form/LaptopInfo/LaptopInfo';
import FormHeader from '../components/Form/FormHeader';
import BackBtn from '../components/BackBtn';

import logo from '../images/form-logo.png';
import { objToFormData } from '../utils';
import FormSuccessPopup from '../components/Form/FormSuccessPopup';

const Form = () => {
  // if true FormSuccessPopup is shown.
  const [successPopup, setSuccessPopup] = useState(false);

  // coworker form data
  const [coworkerData, setCoworkerData] = useState();

  // form steps
  const [step, setStep] = useState(1);

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  // Coworker information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [team, setTeam] = useState({});
  const [position, setPosition] = useState({});
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Laptop information
  const [laptopImg, setLaptopImg] = useState(null);
  const [laptopImgName, setLaptopImgName] = useState('');
  const [laptopImgSize, setLaptopImgSize] = useState('');
  const [laptopName, setLaptopName] = useState('');
  const [laptopBrand, setLaptopBrand] = useState({});
  const [cpu, setCpu] = useState({});
  const [cpuCore, setCpuCore] = useState('');
  const [cpuThread, setCpuThread] = useState('');
  const [ram, setRam] = useState('');
  const [memoryType, setMemoryType] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [price, setPrice] = useState('');
  const [laptopCondition, setLaptopCondition] = useState(null);

  const values = {
    firstName,
    lastName,
    team,
    position,
    email,
    phoneNumber,
    laptopImg,
    laptopImgName,
    laptopImgSize,
    laptopName,
    laptopBrand,
    cpu,
    cpuCore,
    cpuThread,
    ram,
    memoryType,
    purchaseDate,
    price,
    laptopCondition
  };

  const setValues = {
    setFirstName,
    setLastName,
    setTeam,
    setPosition,
    setEmail,
    setPhoneNumber,
    setLaptopImg,
    setLaptopImgName,
    setLaptopImgSize,
    setLaptopName,
    setLaptopBrand,
    setCpu,
    setCpuCore,
    setCpuThread,
    setRam,
    setMemoryType,
    setPurchaseDate,
    setPrice,
    setLaptopCondition
  };

  // sending all data to server
  // ToDo: clear data after sending
  const handleConfirmation = (coworkerData, laptopData) => {
    // data as object
    const fullData = {
      ...Object.fromEntries(coworkerData),
      ...Object.fromEntries(laptopData),
      token: 'ab09d65821320a72cc4969433abaaebf'
    };

    // data as FormData
    const formData = objToFormData(fullData);

    // fetch request options
    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };

    // fetch request
    fetch(
      'https://pcfy.redberryinternship.ge/api/laptop/create',
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    // showing FormSuccessPopup after sending data
    window.scrollTo(0, 0);
    setSuccessPopup(true);
  };

  // disabling scroll when FormSuccessData is shown
  if (successPopup) document.querySelector('body').style.overflow = 'hidden';

  return (
    <div className="form">
      <BackBtn />
      <FormHeader {...{ step, prevStep }} />
      <div className="form__container">
        {step === 1 ? (
          <CoworkerInfo {...{ values, setValues, nextStep, setCoworkerData }} />
        ) : (
          <LaptopInfo
            {...{
              values,
              setValues,
              prevStep,
              handleConfirmation,
              coworkerData
            }}
          />
        )}
      </div>
      <img className="form__logo" src={logo} alt="" />
      {successPopup && <FormSuccessPopup setVisible={setSuccessPopup} />}
    </div>
  );
};

export default Form;
