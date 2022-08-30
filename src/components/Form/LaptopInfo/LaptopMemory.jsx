import React from 'react';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';
import RegularRadioInput from '../../UI/RegularRadioInput/RegularRadioInput';

const LaptopMemory = ({ values, setValues }) => {
  return (
    <div className="laptop-memory form__two-elems">
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
  );
};

export default LaptopMemory;
