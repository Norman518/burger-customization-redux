import React, { Component } from "react";
import { connect } from 'react-redux'

import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axiosOrders";
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    buying: false,
  };

  componentDidMount() {
    this.props.onInitPurchase()
    this.props.onInitIngredients()
  }

  updateBuyableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingredientsKey => {
        return ingredients[ingredientsKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);
    return sum > 0
  }

  buyHandler = () => {
    this.setState({ buying: true });
  };

  buyCancelHandler = () => {
    this.setState({ buying: false });
  };

  buyContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>ingredients can not be loaded </p>
    ) : (
        <Spinner />
      );
    if (this.props.ingredients) {
      burger = (
        <Auxillary>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            buyable={this.updateBuyableState(this.props.ingredients)}
            ordered={this.buyHandler}
            price={this.props.price}
          />
        </Auxillary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.price}
          buyCanceled={this.buyCancelHandler}
          buyContinued={this.buyContinueHandler}
        />
      );
    }

    return (
      <Auxillary>
        <Modal show={this.state.buying} modalClosed={this.buyCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxillary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.buyInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
