import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    bought: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BUY_INIT:
            return {
                ...state,
                bought: false
            }
        case actionTypes.BUY_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.BUY_BURGER_PASSED:
            const newOrder = {
                ...action.orderData,
                id: action.orderID
            }
            return {
                ...state,
                loading: false,
                bought: true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.BUY_BURGER_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;