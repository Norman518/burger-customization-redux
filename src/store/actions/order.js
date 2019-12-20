import * as actionTypes from './actionTypes'
import axios from "../../axiosOrders";

export const buyBurgerPassed = (orderID, orderData) => {
    return {
        type: actionTypes.BUY_BURGER_PASSED,
        orderID,
        orderData
    }
}

export const buyBurgerFailed = (error) => {
    return {
        type: actionTypes.BUY_BURGER_FAILED,
        error
    }
}

export const buyBurgerStart = () => {
    return {
        type: actionTypes.BUY_BURGER_START
    }
}

export const buyBurger = (orderData) => {
    return dispatch => {
        dispatch(buyBurgerStart())
        axios.post('/orders.json', orderData)
            .then(responseponse => {
                dispatch(buyBurgerPassed(responseponse.data.name, orderData))
            })
            .catch(error => {
                dispatch(buyBurgerFailed(error))
            })
    }
}

export const buyInit = () => {
    return {
        type: actionTypes.BUY_INIT
    }
}