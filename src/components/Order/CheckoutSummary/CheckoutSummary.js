import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Enjoy the burger!</h1>
      <div className={classes.Outline} />
      <Burger ingredients={props.ingredients} />
      <Button btnType="Success" clicked={props.checkoutContinue}>
        Continue
      </Button>
      <Button btnType="Danger" clicked={props.checkoutCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default checkoutSummary;
