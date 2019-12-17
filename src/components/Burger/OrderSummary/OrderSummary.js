import React, { Component } from "react";
import Auxillary from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>
          {`: ${this.props.ingredients[igKey]}`}
        </li>
      );
    });
    return (
      <Auxillary>
        <h3>Your Order</h3>
        <p>The burger has the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total Price: <strong>${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Success" clicked={this.props.buyContinued}>
          CONTINUE
        </Button>
        <Button btnType="Danger" clicked={this.props.buyCanceled}>
          CANCEL
        </Button>
      </Auxillary>
    );
  }
}

export default OrderSummary;
