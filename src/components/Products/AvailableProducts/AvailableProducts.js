import React, { useState, useMemo, useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Pagination from '../../UI/Pagination/Pagination';
import classes from './AvailableProducts.module.css';

const renderLoader = () => <p>loading...</p>;

let PageSize = 6;

const AvailableProducts = ({ list }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return list.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, list]);

  useEffect(() => {
    setCurrentPage(1);
  }, [list.length]);

  const productsList = currentData.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      name={product.name}
      category={product.category}
      price={product.price}
      image={product.image}
      bestseller={product.bestseller}
    />
  ));

  return (
    <section className={classes.products}>
      <ul className={classes['products-list']}>{productsList}</ul>

      <Pagination
        className={classes['pagination-bar']}
        currentPage={currentPage}
        totalCount={list.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
};

export default AvailableProducts;
