import React, { useContext } from 'react';
import { FormValuesContext } from '../../../context';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';
import Dropdown from '../../UI/RegularDropdown/Dropdown';

const LaptopModel = ({
  brandOptions,
  laptopNameAlert,
  setLaptopNameAlert,
  brandDropdownAlert,
  setBrandDropdownAlert
}) => {
  const { values, setValues } = useContext(FormValuesContext);
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
        valueName="laptopName"
        alert={laptopNameAlert}
        setAlert={setLaptopNameAlert}
      />
      <Dropdown
        placeholder="ლეპტოპის ბრენდი"
        options={brandOptions}
        setValue={setValues.setLaptopBrand}
        value={values.laptopBrand}
        alert={brandDropdownAlert}
        setAlert={setBrandDropdownAlert}
        valueName="laptopBrand"
      />
    </div>
  );
};

export default LaptopModel;
