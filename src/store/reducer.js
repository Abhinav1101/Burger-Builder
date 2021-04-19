import * as actionTypes from './action';

const INGREDIENT_PRICE = {
    salad: 2.0,
    meat: 5.2,
    cheese: 4.3,
    bacon: 2.6
}

const initialState= {
    ingredients:{
        bacon:0,
        cheese:0,
        meat:0,
        salad:0,
    },
    totalPrice:2.0,
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            let updatedStates = {...state};
            let updatedIngredient = {...updatedStates.ingredients,
                                        [action.ingredientName]:updatedStates.ingredients[action.ingredientName]-1
                                    };
            
            updatedStates.totalPrice-=INGREDIENT_PRICE[action.ingredientName];
            updatedStates.ingredients=updatedIngredient;
            return updatedStates;

        default:
            break;
    }
    
    return state;
}
export default reducer;