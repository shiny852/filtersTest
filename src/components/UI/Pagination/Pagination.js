import React from 'react';
import { UsePagination, DOTS } from './UsePagination';
import classes from './Pagination.module.css';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = UsePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const rightArrowClasses = `${classes['arrow-icon']} ${classes.right}`;
  const leftArrowClasses = `${classes['arrow-icon']} ${classes.left}`;

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classes[`pagination-container ${className ? className : ''}`]}
    >
      <li
        className={`${classes['pagination-item']} ${
          currentPage === 1 ? classes.disabled : ''
        }`}
        onClick={onPrevious}
      >
        <div className='arrow'>
          <div className={leftArrowClasses}></div>
        </div>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li className='pagination-item dots' key={'dots' + pageNumber}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={`${classes['pagination-item']}
               ${pageNumber === currentPage ? classes.selected : ''}`}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${classes['pagination-item']} ${
          currentPage === lastPage ? classes.disabled : ''
        }`}
        onClick={onNext}
      >
        <div className='arrow'>
          <div className={rightArrowClasses}></div>
        </div>
      </li>
    </ul>
  );
};

export default Pagination;
