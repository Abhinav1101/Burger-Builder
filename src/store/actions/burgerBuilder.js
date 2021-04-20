import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (igName) => {
    return {
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName:igName
    } 
}

export const removeIngredients = (igName) => {
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:igName
    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const setIngredients = (ingredient) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients:ingredient
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-burger-builder-7b496-default-rtdb.firebaseio.com/ingredients.json")
        .then(response=>{
            dispatch(setIngredients(response.data));
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed());
        });
    }
}