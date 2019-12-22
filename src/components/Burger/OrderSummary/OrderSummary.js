import React, { Component } from 'react';

import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingredientKey => {
      return (
        <li key={ingredientKey}>
          <span style={{ textTransform: 'capitalize' }}>{ingredientKey}</span>:{' '}
          {this.props.ingredients[ingredientKey]}
        </li>
      );
    });

    return (
      <Auxillary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button buttonType="Fail" clicked={this.props.buyCancelled}>
          CANCEL
        </Button>
        <Button buttonType="Success" clicked={this.props.buyContinued}>
          CONTINUE
        </Button>
      </Auxillary>
    );
  }
}

export default OrderSummary;
