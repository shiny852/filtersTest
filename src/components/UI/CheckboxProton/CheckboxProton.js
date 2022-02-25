import React from 'react';

const CheckboxProton = ({ product, index, changeChecked }) => {
  const { checked, category, id } = product;
  return (
    <li>
      <input
        type='checkbox'
        id={`custom-checkbox-${index}`}
        value={category}
        checked={checked}
        onChange={() => changeChecked(id)}
      />
      <label htmlFor={`custom-checkbox-${index}`}>{product.category}</label>
    </li>
  );
};

export default CheckboxProton;
