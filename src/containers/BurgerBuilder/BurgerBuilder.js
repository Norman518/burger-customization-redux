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

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
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
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
