import React from 'react';
import Dropdown from '../../UI/RegularDropdown/Dropdown';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';

const LaptopCpu = ({
  values,
  setValues,
  cpuOptions,
  cpuDropdownAlert,
  setCpuDropdownAlert
}) => {
  return (
    <div className="laptop-cpu">
      <Dropdown
        placeholder="CPU"
        options={cpuOptions}
        setValue={setValues.setCpu}
        value={values.cpu}
        alert={cpuDropdownAlert}
        setAlert={setCpuDropdownAlert}
        valueName="cpu"
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
        valueName="cpuCore"
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
        valueName="cpuThread"
      />
    </div>
  );
};

export default LaptopCpu;
