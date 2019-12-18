import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux'

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutContinue={this.checkoutContinueHandler}
          checkoutCancel={this.checkoutCancelHandler}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
