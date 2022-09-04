import React, { useEffect, useState } from 'react';
import CoworkerInfo from '../components/Form/CoworkerInfo/CoworkerInfo';
import LaptopInfo from '../components/Form/LaptopInfo/LaptopInfo';
import FormHeader from '../components/Form/FormHeader';
import BackBtn from '../components/BackBtn';
import { FormValuesContext } from '../context';

import logo from '../images/form-logo.png';
import { postData, initialiseLocalStorage } from '../utils';
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
  const handleConfirmation = (coworkerData, laptopData) => {
    // data as object
    const fullData = {
      ...Object.fromEntries(coworkerData),
      ...Object.fromEntries(laptopData),
      token: process.env.REACT_APP_TOKEN
    };

    postData(fullData).then(() => {
      // clearing localStorage data
      localStorage.clear();

      // showing FormSuccessPopup after sending data
      window.scrollTo(0, 0);
      setSuccessPopup(true);
    });
  };

  useEffect(() => {
    initialiseLocalStorage(values, setValues);
  }, []);

  successPopup
    ? (document.querySelector('body').style.overflow = 'hidden')
    : (document.querySelector('body').style.overflow = 'auto');

  return (
    <div className="form">
      <BackBtn formStep={step} prevStep={prevStep} />
      <FormHeader {...{ step, prevStep }} />
      <div className="form__container">
        <FormValuesContext.Provider value={{ values, setValues }}>
          {step === 1 ? (
            <CoworkerInfo {...{ nextStep, setCoworkerData }} />
          ) : (
            <LaptopInfo
              {...{
                prevStep,
                handleConfirmation,
                coworkerData
              }}
            />
          )}
        </FormValuesContext.Provider>
      </div>
      <img className="form__logo" src={logo} alt="" />
      {successPopup && <FormSuccessPopup setVisible={setSuccessPopup} />}
    </div>
  );
};

export default Form;
