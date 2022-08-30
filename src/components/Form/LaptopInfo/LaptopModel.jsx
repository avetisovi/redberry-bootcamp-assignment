import React from 'react';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from '../../UI/RegularDropdown/Dropdown';

const LaptopModel = ({
  values,
  setValues,
  brandOptions,
  brandDropdownAlert,
  setBrandDropdownAlert
}) => {
  return (
    <div className="laptop-model form__two-elems">
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
  );
};

export default LaptopModel;
