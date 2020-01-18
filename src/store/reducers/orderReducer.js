import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util/util';


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
            return updateObject(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return updateObject(state, { loading: false, error: false, purchased: true, orders: state.orders.concat({
                ...action.orderData,
                id: action.orderId
            })});
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { error: true, loading: false });
        case actionTypes.GET_ORDERS_START:
            return updateObject(state, { ordersPageLoading: true, ordersPageError: false });
        case actionTypes.GET_ORDERS_FAIL:
            return updateObject(state, { ordersPageLoading: false, ordersPageError: true });
        case actionTypes.GET_ORDERS_SUCCESS:
            return updateObject(state, { orders: action.orders, ordersPageLoading: false, });
        default:
            return state
    }
}

export default reducer;