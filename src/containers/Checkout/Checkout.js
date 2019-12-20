import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
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
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {
      const boughtRedirect = this.props.bought ? <Redirect to="/" /> : null
      summary = (<div>
        {boughtRedirect}
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutContinue={this.checkoutContinueHandler}
          checkoutCancel={this.checkoutCancelHandler}
        />
        <Route
          path={`${this.props.match.url}/contact-data`}
          component={ContactData}
        />
      </div>)
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    bought: state.order.bought
  }
}

export default connect(mapStateToProps)(Checkout);
