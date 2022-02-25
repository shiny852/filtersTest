import { Fragment, useState, useEffect } from 'react';
import FeaturedProduct from './FeaturedProduct/FeaturedProduct';
import AvailableProducts from './AvailableProducts/AvailableProducts';
import ProductsFilters from './ProductsFilters/ProductsFilters';
import SortIcon from './SortIcon/SortIcon';
import ProductsFiltersIcon from './ProductsFilters/ProductsFiltersIcon/ProductsFiltersIcon';

import classes from './Products.module.css';

const Products = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [list, setList] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [sortBy, setSortBy] = useState('alphabetically');
  const [filtersAreShown, setFiltersAreShown] = useState(false);
  const [priceRange, setPriceRange] = useState([
    {
      id: 0,
      label: 'Lower then $20',
      array: [0, 19],
      checked: false,
    },
    {
      id: 1,
      label: '$20 - $100',
      array: [20, 99],
      checked: false,
    },
    {
      id: 2,
      label: '$100 - $200',
      array: [100, 199],
      checked: false,
    },
    {
      id: 3,
      label: 'More then $200',
      array: [200, 1500000],
      checked: false,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://assignment02-1a084-default-rtdb.europe-west1.firebasedatabase.app/products.json',
        { cache: 'force-cache' },
      );
      const responseData = await response.json();

      const loadedProducts = Object.values(responseData).map((p, index) => ({
        ...p,
        id: index,
      }));
      setFetchedProducts(loadedProducts);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newProducts = [
      ...fetchedProducts
        .filter((item) => item.featured === false)
        .reduce((map, obj) => map.set(obj.category, obj), new Map())
        .values(),
    ].map((item) => ({ ...item, checked: false }));

    setProducts(newProducts);
  }, [fetchedProducts]);

  const handleSelectPriceRange = (event) => {
    const id = +event.target.value;
    const priceRangeStateList = priceRange;
    const changeSelectedPriceRange = priceRangeStateList.find((item) => {
      return item.id === id;
    });
    setSelectedPriceRange(changeSelectedPriceRange);
  };

  const handleChangeChecked = (id) => {
    const productsStateList = products;
    const changeCheckedProducts = productsStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setProducts(changeCheckedProducts);
  };

  const handleOnSort = () => {
    if (sortType === null || sortType === 'desc') {
      setSortType('asc');
    } else {
      setSortType('desc');
    }
  };

  const handleSortBy = (event, value) => {
    setSortBy(event.target.value);
  };

  const showFiltersHandler = () => {
    setFiltersAreShown(true);
  };

  const hideFiltersHandler = () => {
    setFiltersAreShown(false);
  };

  const applyFilters = () => {
    let updatedList = fetchedProducts.filter((item) => item.featured === false);

    // Category Filter
    const productChecked = products
      .filter((item) => item.checked)
      .map((item) => item.category.toLocaleLowerCase());

    if (productChecked.length) {
      updatedList = updatedList.filter((item) =>
        productChecked.includes(item.category),
      );
    }

    // PriceRange Filter

    if (selectedPriceRange) {
      const minPrice = selectedPriceRange.array[0];
      const maxPrice = selectedPriceRange.array[1];
      updatedList = updatedList.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice,
      );
    }

    // Sorting by alphabet
    if (sortBy === 'alphabetically' && sortType) {
      updatedList = updatedList.sort((a, b) => {
        const isReversed = sortType === 'asc' ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
      });
    }

    if (sortBy === 'byPrice' && sortType) {
      updatedList = updatedList.sort((a, b) => {
        const isPriceReversed =
          sortType === 'asc' ? a.price - b.price : b.price - a.price;
        return isPriceReversed;
      });
    }

    setList(updatedList);
  };

  useEffect(() => {
    applyFilters();
  }, [products, selectedPriceRange, sortType, sortBy, fetchedProducts]);

  const featuredProducts = fetchedProducts.filter((item) => item.featured);

  return (
    <Fragment>
      {featuredProducts.map((item, index) => (
        <FeaturedProduct item={item} key={index} />
      ))}

      <div className={classes['products-topbar']}>
        <div className={classes['topbar-heading']}>
          <h3>Products </h3> &nbsp;/&nbsp; <span> Steps</span>
        </div>

        <div className={classes['topbar-actions']}>
          <div>
            <button
              className={classes.sort}
              onClick={handleOnSort}
              aria-label='sort-icon'
            >
              <SortIcon />
            </button>
            <span className={classes['sort-span']}>Sort By</span>&nbsp;
            <select
              onChange={handleSortBy}
              value={sortBy}
              className={classes['sort-select']}
            >
              <option value='alphabetically'>Alphabet</option>
              <option value='byPrice'>Price</option>
            </select>
          </div>

          <button
            className={classes['responsive-icon']}
            onClick={showFiltersHandler}
            aria-label='products-filters'
          >
            <ProductsFiltersIcon />
          </button>
        </div>
      </div>
      <div className={classes['products-main']}>
        <ProductsFilters
          responsiveNone
          products={products}
          changeChecked={handleChangeChecked}
          priceRange={priceRange}
          selectPriceRange={handleSelectPriceRange}
        />

        {filtersAreShown && (
          <ProductsFilters
            responsive
            products={products}
            changeChecked={handleChangeChecked}
            priceRange={priceRange}
            selectPriceRange={handleSelectPriceRange}
            onClose={hideFiltersHandler}
          />
        )}

        <AvailableProducts list={list} />
      </div>
    </Fragment>
  );
};

export default Products;
