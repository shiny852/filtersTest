import React from 'react';

const PriceRangeCheckBox = ({ item, index, selectPriceRange }) => {
  const { id, label } = item;

  return (
    <li>
      <input
        name='priceRangeCheckBox'
        type='radio'
        id={`custom-radio-${index}`}
        value={id}
        onChange={selectPriceRange}
      />
      <label htmlFor={`custom-radio-${index}`}>{label}</label>
    </li>
  );
};

export default PriceRangeCheckBox;
