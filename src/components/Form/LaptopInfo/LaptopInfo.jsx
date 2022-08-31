import React, { useEffect, useState } from 'react';
import {
  fetchOptions,
  isObjectEmpty,
  blobToBinaryString
} from '../../../utils';
import FileInput from '../FileInput';
import DateInput from '../../UI/DateInput/DateInput';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';
import RegularRadioInput from '../../UI/RegularRadioInput/RegularRadioInput';

import LaptopModel from './LaptopModel';
import LaptopCpu from './LaptopCpu';
import LaptopMemory from './LaptopMemory';
import LaptopPurchase from './LaptopPurchase';

const LaptopInfo = ({
  prevStep,
  handleConfirmation,
  values,
  setValues,
  setLaptopData
}) => {
  const [brandOptions, setBrandOptions] = useState([]);
  const [cpuOptions, setCpuOptions] = useState([]);

  const [imgAlert, setImgAlert] = useState(false);
  const [brandDropdownAlert, setBrandDropdownAlert] = useState(false);
  const [cpuDropdownAlert, setCpuDropdownAlert] = useState(false);

  useEffect(() => {
    fetchOptions('https://pcfy.redberryinternship.ge/api/brands').then((res) =>
      setBrandOptions(res)
    );

    fetchOptions('https://pcfy.redberryinternship.ge/api/cpus').then((res) => {
      setCpuOptions(res);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.laptopImg) {
      setImgAlert(true);
      window.scrollTo(0, 0);
    } else if (isObjectEmpty(values.laptopBrand)) {
      setBrandDropdownAlert(true);
      window.scrollTo(0, 0);
    } else if (isObjectEmpty(values.cpu)) {
      setCpuDropdownAlert(true);
      window.scrollTo(0, 0);
    } else {
      const binaryImg = await blobToBinaryString(values.laptopImg);

      const data = new FormData(e.target);
      data.append('laptop_brand_id', values.laptopBrand.id);
      data.append('laptop_cpu', values.cpu.name);
      data.append('laptop_image', binaryImg);

      setLaptopData(data);
      handleConfirmation();
    }
  };

  return (
    <form className="laptop-info" onSubmit={handleSubmit}>
      <FileInput
        value={values.laptopImg}
        setValue={setValues.setLaptopImg}
        imgName={values.laptopImgName}
        setImgName={setValues.setLaptopImgName}
        imgSize={values.laptopImgSize}
        setImgSize={setValues.setLaptopImgSize}
        alert={imgAlert}
        setAlert={setImgAlert}
        name="laptop_image"
      />
      <LaptopModel
        {...{
          values,
          setValues,
          brandOptions,
          brandDropdownAlert,
          setBrandDropdownAlert
        }}
      />
      <div className="laptop-section__break"></div>
      <LaptopCpu
        {...{
          values,
          setValues,
          cpuOptions,
          cpuDropdownAlert,
          setCpuDropdownAlert
        }}
      />
      <LaptopMemory {...{ values, setValues }} />
      <div className="laptop-section__break"></div>
      <LaptopPurchase {...{ values, setValues }} />

      <RegularRadioInput
        title="ლეპტოპის მდგომარეობა"
        name="laptop_state"
        options={[
          { id: 'new', label: 'ახალი' },
          { id: 'used', label: 'მეორადი' }
        ]}
        setValue={setValues.setLaptopCondition}
        value={values.laptopCondition}
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