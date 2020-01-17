import * as actionTypes from './actionTypes';
import axios_orders from '../../axios-orders';

export const addIngredient = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: payload['ingredientName']
    };
};

export const removeIngredient = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: payload.ingredientName
    };
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

const initializeIngredientsFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED
    };
};

export const initIngredients = (payload) => {
    return dispatch => {
        axios_orders.get('/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(err => {
            dispatch(initializeIngredientsFailed());
        });
    };
};