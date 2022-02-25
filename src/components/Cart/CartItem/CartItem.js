import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div className={classes.description}>
        <div className={classes.name}>{props.name}</div>
        <span className={classes.price}>{price}</span>
        <span className={classes.amount}>Amount: {props.amount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
      <div className={classes['image-wrapper']}>
        <img
          src={props.image.src}
          rel='preconnect'
          alt={props.image.alt}
          className={classes.image}
        />
      </div>
    </li>
  );
};

export default CartItem;
