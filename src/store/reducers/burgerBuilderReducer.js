import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util/util';

const prices = {
    salad: 0.5,
    cheese: 1,
    bacon: 2,
    meat: 1.5
}

let newPrice = 0;
let updatedIngredients = null;

const initialState = {
    ingredients: null,
    totalPrice: 0.2,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    newPrice = state.totalPrice + 1 - 1;
    newPrice += prices[action.ingredientName];
    updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 })
    return updateObject(state, { ingredients: updatedIngredients, totalPrice: newPrice, building: true });
};

const removeIngredient = (state, action) => {
    newPrice = state.totalPrice + 1 - 1;
    newPrice -= prices[action.ingredientName];
    if (state.ingredients[action.ingredientName] > 0) {
        updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 })
        return updateObject(state, { ingredients: updatedIngredients, totalPrice: newPrice, building: true });
    // eslint-disable-next-line
    } 
    // make this true only if all ingredients are set to zero
    // else if (state.ingredients[action.ingredientName] == 0) {
    //     return { ...state, building: false };
    // } 
    else {
        return state;
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, { ingredients: action.ingredients, totalPrice: 0.2, building: false });
        case actionTypes.SET_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state
    }
}

export default reducer;