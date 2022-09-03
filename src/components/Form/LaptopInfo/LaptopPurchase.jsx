import React from 'react';

import DateInput from '../../UI/DateInput/DateInput';
import InputWithLabelAndHint from '../../UI/InputWithLabelAndHint/InputWithLabelAndHint';

import gelImg from '../../../images/gel.svg';

const LaptopPurchase = ({ values, setValues }) => {
  return (
    <div className="laptop-purchase form__two-elems">
      <DateInput
        label="შეძენის რიცხვი (არჩევითი)"
        placeholder="დდ / თთ / წწწწ"
        type="date"
        value={values.purchaseDate}
        setValue={setValues.setPurchaseDate}
        name="laptop_purchase_date"
        valueName="purchaseDate"
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
        valueName="price"
      />
    </div>
  );
};

export default LaptopPurchase;
