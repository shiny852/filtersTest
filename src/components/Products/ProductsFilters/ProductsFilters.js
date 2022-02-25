import React from 'react';
import Modal from '../../UI/Modal/Modal';
import CheckboxProton from '../../UI/CheckboxProton/CheckboxProton';
import PriceRangeCheckBox from '../../UI/PriceRangeCheckbox/PriceRangeCheckbox';
import CloseIcon from '../../Cart/CartIcons/CloseIcon';
import classes from './ProductsFilters.module.css';

const ProductsFilters = ({
  products,
  changeChecked,
  priceRange,
  selectPriceRange,
  responsive,
  responsiveNone,
  onClose,
}) => {
  const desktopContent = (
    <section className={classes.filters}>
      <div className={classes['multiple-filters']}>
        <h3 className={classes['category-title']}>Category</h3>
        <ul className={classes['category-body']}>
          {products.map((product, index) => (
            <CheckboxProton
              index={index}
              key={product.id}
              product={product}
              changeChecked={changeChecked}
            />
          ))}
        </ul>
      </div>
      <div className={classes['single-filters']}>
        <h3>Price range</h3>
        <ul>
          {priceRange.map((item, index) => (
            <PriceRangeCheckBox
              index={index}
              key={item.id}
              item={item}
              selectPriceRange={selectPriceRange}
            />
          ))}
        </ul>
      </div>
    </section>
  );

  const responsiveContent = (
    <Modal className={classes['responsive-filters']} onClose={onClose}>
      <section className={classes['responsive-filters-content']}>
        <div className={classes['multiple-filters']}>
          <div className={classes['filters-header']}>
            <h3>Filter</h3>
            <button onClick={onClose} aria-label='close-filters-icon'>
              <CloseIcon />
            </button>
          </div>
          <h3 className={classes['category-title']}>Category</h3>
          <ul className={classes['category-body']}>
            {products.map((product, index) => (
              <CheckboxProton
                index={index}
                key={product.id}
                product={product}
                changeChecked={changeChecked}
              />
            ))}
          </ul>
        </div>
        <div className={classes['single-filters']}>
          <h3>Price range</h3>
          <ul>
            {priceRange.map((item, index) => (
              <PriceRangeCheckBox
                index={index}
                key={item.id}
                item={item}
                selectPriceRange={selectPriceRange}
              />
            ))}
          </ul>
        </div>
      </section>
    </Modal>
  );

  return (
    <>
      {responsiveNone && desktopContent}
      {responsive && responsiveContent}
    </>
  );
};

export default ProductsFilters;
