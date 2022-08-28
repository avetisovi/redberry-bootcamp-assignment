import React, { useEffect, useState } from 'react';
import { fetchOptions } from '../utils';
import FileInput from './FileInput';
import DateInput from './UI/DateInput/DateInput';
import InputWithLabelAndHint from './UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from './UI/RegularDropdown/Dropdown';
import RegularRadioInput from './UI/RegularRadioInput/RegularRadioInput';

const LaptopInfo = ({ prevStep, handleConfirmation }) => {
  const [brandOptions, setBrandOptions] = useState([]);
  const [cpuOptions, setCpuOptions] = useState([]);

  useEffect(() => {
    fetchOptions('https://pcfy.redberryinternship.ge/api/brands').then((res) =>
      setBrandOptions(res)
    );

    fetchOptions('https://pcfy.redberryinternship.ge/api/cpus').then((res) => {
      setCpuOptions(res);
    });
  }, []);
  return (
    <form className="laptop-info">
      <FileInput />
      <div className="laptop-model">
        <InputWithLabelAndHint
          label="ლეპტოპის სახელი"
          hint="ლათინური ასოები, ციფრები, !@#$%^&*()_+= "
          placeholder="HP"
        />
        <Dropdown placeholder="ლეპტოპის ბრენდი" options={brandOptions} />
      </div>
      <div className="laptop-section__break"></div>
      <div className="laptop-cpu">
        <Dropdown placeholder="CPU" options={cpuOptions} />
        <InputWithLabelAndHint
          label="CPU-ს ბირთვი"
          hint="მხოლოდ ციფრები"
          placeholder="14"
        />
        <InputWithLabelAndHint
          label="CPU-ს ნაკადი"
          hint="მხოლოდ ციფრები"
          placeholder="365"
        />
      </div>
      <div className="laptop-memory">
        <InputWithLabelAndHint
          label="ლეპტოპის RAM (GB)"
          hint="მხოლოდ ციფრები"
          placeholder="16"
        />
        <RegularRadioInput
          title="მეხსიერების ტიპი"
          name="mem-type"
          options={[
            { id: 'ssd', label: 'SSD' },
            { id: 'hdd', label: 'HDD' }
          ]}
        />
      </div>
      <div className="laptop-section__break"></div>
      <div className="laptop-purchase">
        <DateInput
          label="შეძენის რიცხვი (არჩევითი)"
          placeholder="დდ / თთ / წწწწ"
          type="date"
        />
        <InputWithLabelAndHint
          label="ლეპტოპის ფასი"
          hint="მხოლოდ ციფრები"
          placeholder="0000"
        />
      </div>
      <RegularRadioInput
        title="ლეპტოპის მდგომარეობა"
        name="laptop-condition"
        options={[
          { id: 'new', label: 'ახალი' },
          { id: 'secondHand', label: 'მეორადი' }
        ]}
      />
      <div className="laptop-info__buttons">
        <button className="laptop-info__prev-btn" onClick={prevStep}>
          უკან
        </button>
        <button
          className="laptop-info__submit-btn"
          onClick={handleConfirmation}
        >
          დამახსოვრება
        </button>
      </div>
    </form>
  );
};

export default LaptopInfo;
