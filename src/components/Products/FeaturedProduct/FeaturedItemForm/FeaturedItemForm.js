import { useRef, useState } from 'react';
import Input from '../../../UI/Input/Input';
import classes from './FeaturedItemForm.module.css';

const FeaturedItemForm = ({ onAddToCart, id, responsive, responsiveNone }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  return (
    <form
      className={`${classes.form} ${
        responsive ? classes['responsive-item'] : ''
      } ${responsiveNone ? classes['responsive-none'] : ''}`}
      onSubmit={submitHandler}
    >
      <button>Add to cart</button>

      <Input
        ref={amountInputRef}
        input={{
          id: 'amount_' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />

      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default FeaturedItemForm;
