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
import * as actionTypes from '../../store/actions'
const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.65,
  meat: 1,
  tomato: 0.75
};
class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    totalPrice: 2,
    buyable: false,
    buying: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get("https://react-my-burger-fb909.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }

  updateBuyableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ buyable: sum > 0 });
  }

  addIngredientHandler = type => {
    const updatedCount = this.props.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.props.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateBuyableState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    if (this.props.ingredients[type] <= 0) {
      return;
    }
    const updatedCount = this.props.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.props.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updateBuyableState(updatedIngredients);
  };

  buyHandler = () => {
    this.setState({ buying: true });
  };

  buyCancelHandler = () => {
    this.setState({ buying: false });
  };

  buyContinueHandler = () => {

    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.props.ingredients[i]
        )}`
      );
    }
    queryParams.push(`price=${this.state.totalPrice}`)
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
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
            buyable={this.state.buyable}
            ordered={this.buyHandler}
            price={this.state.totalPrice}
          />
        </Auxillary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.state.totalPrice}
          buyCanceled={this.buyCancelHandler}
          buyContinued={this.buyContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ingredients: state.ingredients
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
