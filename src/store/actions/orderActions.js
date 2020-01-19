import * as actionTypes from './actionTypes';
import axios_orders from '../../axios-orders';

const purchaseBurgerSuccess = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: payload['id'],
        orderData: payload['data']
    };
};

const purchaseBurgerFail  = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: payload['error']
    };
};

const purchaseBurgerStart  = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger  = (payload) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios_orders.post('/orders.json?auth=' + payload['authToken'], payload['orderData'])
        .then(response => {
            dispatch(purchaseBurgerSuccess({
                orderId: response.data.name,
                orderData: payload['orderData']
            }));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail({
                error: error
            }));
        });
    };
};

export const purchaseInit = (payload) => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


// show all orders page
const getOrdersSuccess = (payload) => {
    return {
        type: actionTypes.GET_ORDERS_SUCCESS,
        orders: payload['orders']
    };
};

const getOrdersFail = (payload) => {
    return {
        type: actionTypes.GET_ORDERS_FAIL,
        error: payload['error']
    };
};

const getOrdersStart = () => {
    return {
        type: actionTypes.GET_ORDERS_START
    };
};

export const getOrders = (payload) => {
    return dispatch => {
        dispatch(getOrdersStart());
        const queryParams = '?auth=' + payload['authToken'] + '&orderBy="userId"&equalTo="' + payload['userId'] +'"'; 
        axios_orders.get('/orders.json' + queryParams)
        .then(response => {
            const fetchedOrders = [];
            
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(getOrdersSuccess({
                orders: fetchedOrders
            }));
        })
        .catch(error => {
            dispatch(getOrdersFail({
                error: error
            }));
        });
    }
}


