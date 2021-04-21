import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICE = {
    salad: 2.0,
    meat: 5.2,
    cheese: 4.3,
    bacon: 2.6
}

const initialState= {
    ingredients:null,
    totalPrice:2.0,
    error:false,
    building:false
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
                building:true,
                totalPrice:state.totalPrice+INGREDIENT_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENTS:
            let updatedStates = {...state};
            let updatedIngredient = {...updatedStates.ingredients,
                                        [action.ingredientName]:updatedStates.ingredients[action.ingredientName]-1
                                    };
            
            updatedStates.totalPrice-=INGREDIENT_PRICE[action.ingredientName];
            updatedStates.building=true;
            updatedStates.ingredients=updatedIngredient;
            return updatedStates;
        case actionTypes.SET_INGREDIENTS:
            console.log(action.ingredients);
            return {
                ...state,
                ingredients:action.ingredients,
                totalPrice:2.0,
                error:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }

        default:
            break;
    }
    
    return state;
}
export default reducer;