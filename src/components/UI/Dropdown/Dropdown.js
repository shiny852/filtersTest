import classes from './Dropdown.module.css';

const Dropdown = (props) => {
  return (
    <div className={classes.dropdown}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default Dropdown;
