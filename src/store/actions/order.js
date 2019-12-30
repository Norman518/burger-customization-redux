import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const buyBurgerSuccess = (orderID, orderData) => {
  return {
    type: actionTypes.BUY_BURGER_SUCCESS,
    orderID,
    orderData,
  };
};

export const buyBurgerFail = error => {
  return {
    type: actionTypes.BUY_BURGER_FAIL,
    error,
  };
};

export const buyBurgerStart = () => {
  return {
    type: actionTypes.BUY_BURGER_START,
  };
};

export const buyBurger = (orderData, token) => {
  return dispatch => {
    dispatch(buyBurgerStart());
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(buyBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(buyBurgerFail(error));
      });
  };
};

export const buyInit = () => {
  return {
    type: actionTypes.BUY_INIT,
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, localID) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="localID"&equalTo="${localID}"`;
    axios
      .get(`/orders.json${queryParams}`)
      .then(response => {
        const fetchedOrders = [];
        for (const key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
