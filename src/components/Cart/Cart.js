import { useContext } from 'react';

import Dropdown from '../UI/Dropdown/Dropdown';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CloseIcon from './CartIcons/CloseIcon';
import CartItem from './CartItem/CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    const cartItem = { ...item, amount: 1 };
    cartCtx.addItem(cartItem);
  };

  const clearCartItemsHandler = () => {
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item, index) => (
        <CartItem
          key={index.toString()}
          name={item.name}
          amount={item.amount}
          price={item.price}
          image={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Dropdown>
      <div className={classes['close-icon']}>
        <button onClick={props.onClose} aria-label='close-icon'>
          <CloseIcon />
        </button>
      </div>

      {cartItems}

      <div className={classes.total}>
        <span className={classes['total-label']}>Total Amount </span>
        <span className={classes['total-value']}>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={() => {
            clearCartItemsHandler();
            props.onClose();
          }}
        >
          Clear
        </button>
        {hasItems && <button className={classes['order-button']}>Order</button>}
      </div>
    </Dropdown>
  );
};

export default Cart;
