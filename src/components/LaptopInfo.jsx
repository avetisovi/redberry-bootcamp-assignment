import React, { useEffect, useState } from 'react';
import { fetchOptions, isObjectEmpty, blobToBinaryString } from '../utils';
import FileInput from './FileInput';
import DateInput from './UI/DateInput/DateInput';
import InputWithLabelAndHint from './UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from './UI/RegularDropdown/Dropdown';
import RegularRadioInput from './UI/RegularRadioInput/RegularRadioInput';
import gelImg from '../images/gel.svg';

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
        alert={imgAlert}
        setAlert={setImgAlert}
        name="laptop_image"
      />
      <div className="laptop-model">
        <InputWithLabelAndHint
          label="ლეპტოპის სახელი"
          hint="ლათინური ასოები, ციფრები, !@#$%^&*()_+= "
          placeholder="HP"
          validation={{
            pattern: '[a-zA-Z0-9\\s!@#$%^&*()_+=]{1,}'
          }}
          value={values.laptopName}
          onChange={setValues.setLaptopName}
          name="laptop_name"
        />
        <Dropdown
          placeholder="ლეპტოპის ბრენდი"
          options={brandOptions}
          setValue={setValues.setLaptopBrand}
          value={values.laptopBrand}
          alert={brandDropdownAlert}
          setAlert={setBrandDropdownAlert}
        />
      </div>
      <div className="laptop-section__break"></div>
      <div className="laptop-cpu">
        <Dropdown
          placeholder="CPU"
          options={cpuOptions}
          setValue={setValues.setCpu}
          value={values.cpu}
          alert={cpuDropdownAlert}
          setAlert={setCpuDropdownAlert}
        />
        <InputWithLabelAndHint
          label="CPU-ს ბირთვი"
          hint="მხოლოდ ციფრები"
          placeholder="14"
          type="number"
          validation={{ min: 1, pattern: '[0-9]' }}
          value={values.cpuCore}
          onChange={setValues.setCpuCore}
          name="laptop_cpu_cores"
        />
        <InputWithLabelAndHint
          label="CPU-ს ნაკადი"
          hint="მხოლოდ ციფრები"
          placeholder="365"
          type="number"
          validation={{ min: 1, pattern: '[0-9]' }}
          value={values.cpuThread}
          onChange={setValues.setCpuThread}
          name="laptop_cpu_threads"
        />
      </div>
      <div className="laptop-memory">
        <InputWithLabelAndHint
          label="ლეპტოპის RAM (GB)"
          hint="მხოლოდ ციფრები"
          placeholder="16"
          type="number"
          validation={{ min: 1, pattern: '[0-9]' }}
          value={values.ram}
          onChange={setValues.setRam}
          name="laptop_ram"
        />
        <RegularRadioInput
          title="მეხსიერების ტიპი"
          name="laptop_hard_drive_type"
          options={[
            { id: 'SSD', label: 'SSD' },
            { id: 'HDD', label: 'HDD' }
          ]}
          setValue={setValues.setMemoryType}
          value={values.memoryType}
        />
      </div>
      <div className="laptop-section__break"></div>
      <div className="laptop-purchase">
        <DateInput
          label="შეძენის რიცხვი (არჩევითი)"
          placeholder="დდ / თთ / წწწწ"
          type="date"
          value={values.purchaseDate}
          setValue={setValues.setPurchaseDate}
          name="laptop_purchase_date"
        />
        <InputWithLabelAndHint
          label="ლეპტოპის ფასი"
          hint="მხოლოდ ციფრები"
          placeholder="0000"
          img={gelImg}
          type="number"
          validation={{ min: 1, pattern: '[0-9]' }}
          value={values.price}
          onChange={setValues.setPrice}
          name="laptop_price"
        />
      </div>
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
