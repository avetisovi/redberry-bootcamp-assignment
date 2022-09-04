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

  const [imgAlert, setImgAlert] = useState(false);
  const [brandDropdownAlert, setBrandDropdownAlert] = useState(false);
  const [cpuDropdownAlert, setCpuDropdownAlert] = useState(false);
  const [memoryAlert, setMemoryAlert] = useState(false);
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
    // checking for validity
    if (!values.laptopImg) {
      setImgAlert(true);
      window.scrollTo(0, 0);
    } else if (isObjectEmpty(values.laptopBrand)) {
      setBrandDropdownAlert(true);
      window.scrollTo(0, 0);
    } else if (isObjectEmpty(values.cpu)) {
      setCpuDropdownAlert(true);
      window.scrollTo(0, 0);
    } else if (!values.memoryType) {
      setMemoryAlert(true);
    } else if (!values.laptopCondition) {
      setConditionAlert(true);
    } else {
      // send data if form is valid
      const data = new FormData(e.target);
      data.append('laptop_brand_id', values.laptopBrand.id);
      data.append('laptop_cpu', values.cpu.name);
      data.append('laptop_image', values.laptopImg);

      handleConfirmation(coworkerData, data);
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
          brandDropdownAlert,
          setBrandDropdownAlert
        }}
      />
      <div className="laptop-section__break"></div>
      <LaptopCpu
        {...{
          cpuOptions,
          cpuDropdownAlert,
          setCpuDropdownAlert
        }}
      />
      <LaptopMemory {...{ memoryAlert, setMemoryAlert }} />
      <div className="laptop-section__break"></div>
      <LaptopPurchase />

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
