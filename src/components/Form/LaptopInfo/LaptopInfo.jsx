import React, { useEffect, useState, useContext } from 'react';
import { getData, isObjectEmpty } from '../../../utils';
import FileInput from '../FileInput';
import RegularRadioInput from '../../UI/RegularRadioInput/RegularRadioInput';

import LaptopModel from './LaptopModel';
import LaptopCpu from './LaptopCpu';
import LaptopMemory from './LaptopMemory';
import LaptopPurchase from './LaptopPurchase';
import { FormValuesContext } from '../../../context';

const LaptopInfo = ({ prevStep, handleConfirmation, coworkerData }) => {
  const [brandOptions, setBrandOptions] = useState([]);
  const [cpuOptions, setCpuOptions] = useState([]);

  // alerts
  const [imgAlert, setImgAlert] = useState(false);
  const [laptopNameAlert, setLaptopNameAlert] = useState(false);
  const [brandDropdownAlert, setBrandDropdownAlert] = useState(false);

  const [cpuDropdownAlert, setCpuDropdownAlert] = useState(false);
  const [cpuCoreAlert, setCpuCoreAlert] = useState(false);
  const [cpuThreadAlert, setCpuThreadAlert] = useState(false);

  const [ramAlert, setRamAlert] = useState(false);
  const [memoryTypeAlert, setMemoryTypeAlert] = useState(false);

  const [priceAlert, setPriceAlert] = useState(false);
  const [conditionAlert, setConditionAlert] = useState(false);

  const { values, setValues } = useContext(FormValuesContext);

  // fetching brands and cpu options
  useEffect(() => {
    getData('https://pcfy.redberryinternship.ge/api/brands').then(
      setBrandOptions
    );

    getData('https://pcfy.redberryinternship.ge/api/cpus').then(setCpuOptions);
  }, []);

  // submitting form and sending post request
  const handleSubmit = (e) => {
    e.preventDefault();

    // values of form's second step
    const laptopValues = [
      values.laptopImg,
      values.laptopName,
      values.laptopBrand,
      values.cpu,
      values.cpuCore,
      values.cpuThread,
      values.ram,
      values.memoryType,
      values.price,
      values.laptopCondition
    ];

    // not filled
    const emptyValues = laptopValues.filter(
      (value) =>
        value === null ||
        value === 'null' ||
        isObjectEmpty(value) ||
        value === ''
    );

    // checking everything is filled
    if (!emptyValues.length) {
      console.log('working');
      const data = new FormData(e.target);

      data.append('laptop_brand_id', values.laptopBrand.id);
      data.append('laptop_cpu', values.cpu.name);
      data.append('laptop_image', values.laptopImg);

      handleConfirmation(coworkerData, data);

      return;
    }

    // setting alerts for not filled inputs and dropdowns
    if (!values.laptopImg) {
      setImgAlert(true);
    }

    if (!values.laptopName) {
      setLaptopNameAlert(true);
    }

    if (isObjectEmpty(values.laptopBrand)) {
      setBrandDropdownAlert(true);
    }

    if (isObjectEmpty(values.cpu)) {
      setCpuDropdownAlert(true);
    }

    if (!values.cpuCore) {
      setCpuCoreAlert(true);
    }

    if (!values.cpuThread) {
      setCpuThreadAlert(true);
    }

    if (!values.ram) {
      setRamAlert(true);
    }

    if (!values.memoryType || values.memoryType === 'null') {
      setMemoryTypeAlert(true);
    }

    if (!values.price) {
      setPriceAlert(true);
    }

    if (!values.laptopCondition || values.laptopCondition === 'null') {
      setConditionAlert(true);
    }
  };

  return (
    <form className="laptop-info" onSubmit={handleSubmit}>
      <FileInput
        value={values.laptopImg}
        imgName={values.laptopImgName}
        imgSize={values.laptopImgSize}
        setValue={setValues.setLaptopImg}
        setImgName={setValues.setLaptopImgName}
        setImgSize={setValues.setLaptopImgSize}
        alert={imgAlert}
        setAlert={setImgAlert}
        name="laptop_image"
      />
      <LaptopModel
        {...{
          brandOptions,
          laptopNameAlert,
          setLaptopNameAlert,
          brandDropdownAlert,
          setBrandDropdownAlert
        }}
      />
      <div className="laptop-section__break"></div>
      <LaptopCpu
        {...{
          cpuOptions,
          cpuDropdownAlert,
          setCpuDropdownAlert,
          cpuCoreAlert,
          setCpuCoreAlert,
          cpuThreadAlert,
          setCpuThreadAlert
        }}
      />
      <LaptopMemory
        {...{ ramAlert, setRamAlert, memoryTypeAlert, setMemoryTypeAlert }}
      />
      <div className="laptop-section__break"></div>
      <LaptopPurchase {...{ priceAlert, setPriceAlert }} />

      <RegularRadioInput
        title="ლეპტოპის მდგომარეობა"
        name="laptop_state"
        options={[
          { id: 'new', label: 'ახალი' },
          { id: 'used', label: 'მეორადი' }
        ]}
        setValue={setValues.setLaptopCondition}
        value={values.laptopCondition}
        valueName="laptopCondition"
        setAlert={setConditionAlert}
        alert={conditionAlert}
      />
      <div className="laptop-info__buttons">
        <button
          type="button"
          className="laptop-info__prev-btn"
          onClick={prevStep}
        >
          უკან
        </button>
        <button type="submit" className="laptop-info__submit-btn">
          დამახსოვრება
        </button>
      </div>
    </form>
  );
};

export default LaptopInfo;
