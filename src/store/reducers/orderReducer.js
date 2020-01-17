import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false,


    ordersPageLoading: true,
    ordersPageError: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                    error: false,
                    purchased: true,
                    orders: state.orders.concat({
                        ...action.orderData,
                        id: action.orderId
                    })
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                error: true
            };

        case actionTypes.GET_ORDERS_START:
            return {
                ...state,
                ordersPageLoading: true,
                ordersPageError: false
            };
        case actionTypes.GET_ORDERS_FAIL:
            return {
                ...state,
                ordersPageLoading: false,
                ordersPageError: true
            };
        case actionTypes.GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                ordersPageLoading: false,
            };

        default:
            return state
    }
}

export default reducer;