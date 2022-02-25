import React, { useContext } from 'react';
import FeaturedItemForm from './FeaturedItemForm/FeaturedItemForm';
import CartContext from '../../../store/cart-context';
import classes from './FeaturedProduct.module.css';

const FeaturedProduct = ({ item }) => {
  const cartCtx = useContext(CartContext);
  const price = `$${item.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: item.id,
      name: item.name,
      amount: amount,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <section>
      <div className={classes['featured-topbar']}>
        <h3>{item.name}</h3>

        <FeaturedItemForm
          responsiveNone
          onAddToCart={addToCartHandler}
          className={classes['responsive-none']}
        />
      </div>
      <div className={classes['featured-image-wrapper']}>
        <img src={item.image.src} alt={item.image.alt} rel='preconnect' />
      </div>

      <FeaturedItemForm
        responsive
        onAddToCart={addToCartHandler}
        className={classes['responsive-item']}
        id={item.id}
      />

      <div className={classes['featured-content']}>
        <div className={classes['content-left']}>
          <span className={classes.about}>About the {item.name}</span>
          <span className={classes.category}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </span>
          <span className={classes.price}>{price}</span>
          <span className={classes.description}>
            {item.details.description}
          </span>
        </div>
        <div className={classes['content-right']}>
          <span className={classes.recommendations}>People also buy</span>
          <div className={classes['recommendations-images-box']}>
            {item.details.recomendations.map((image, index) => (
              <img
                src={image.src}
                rel='preconnect'
                alt={image.alt}
                key={index}
              />
            ))}
          </div>
          <span className={classes.details}>Details</span>
          <span className={classes.dimensions}>
            {`Size: ${item.details.dimensions.width}x${item.details.dimensions.height} pixel`}
          </span>
          <span className={classes.size}>{`Size: ${
            item.details.size / 1000
          } mb`}</span>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
