import * as actionTypes from './actions';

const prices = {
    salad: 0.5,
    cheese: 1,
    bacon: 2,
    meat: 1.5
}

let newPrice = 0;

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0.2
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            newPrice = state.totalPrice + 1 - 1;
            newPrice += prices[action.ingredientName];
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: newPrice
            };
        case actionTypes.REMOVE_INGREDIENT:
            newPrice = state.totalPrice + 1 - 1;
            newPrice += prices[action.ingredientName];
            if (state.ingredients[action.ingredientName] > 0) {
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    },
                    totalPrice: newPrice
                };
            } else {
                return state;
            }
            
        default:
            return {
                ...state
            };
    }
}

export default reducer;