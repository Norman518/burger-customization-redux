import * as actionTypes from './actionTypes'
import axios from "../../axiosOrders";

export const purchaseBurgerPassed = (orderID, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_PASSED,
        orderID,
        orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerPassed(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}