import React, { useState } from 'react';
import CoworkerInfo from '../components/CoworkerInfo';
import LaptopInfo from '../components/LaptopInfo';
import FormHeader from '../components/FormHeader';
import BackBtn from '../components/BackBtn';

const Form = () => {
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
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Laptop information
  const [laptopImg, setLaptopImg] = useState(null);
  const [laptopName, setLaptopName] = useState('');
  const [laptopBrand, setLaptopBrand] = useState('');
  const [cpu, setCpu] = useState('');
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

  const handleConfirmation = () => {};

  return (
    <div>
      <BackBtn />
      <FormHeader step={step} />
      <div className="container">
        {step === 1 ? (
          <CoworkerInfo {...{ values, setValues, nextStep }} />
        ) : (
          <LaptopInfo
            {...{ values, setValues, prevStep, handleConfirmation }}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
