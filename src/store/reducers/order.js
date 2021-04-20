import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orderData:[],
    error:false,
    loading:false,
    purchased:false,
}

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const orderDataFromAction = {
                ...action.orderData,
                id:action.id
            }
            return {
                ...state,
                orderData:state.orderData.concat(orderDataFromAction),
                loading:false,
                error:false,
                purchased:true,
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading:false,
                error:true,
                purchased:true
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading:true
            }
        case actionTypes.CLEAR_STATE:
            
            return {
                ...state,
                orderData:[],
                error:false,
                loading:false,
                purchased:false,
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading:true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orderData:action.orderData,
                loading:false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading:false,
                error:true
            }
        default:
            return state;
    }
}
export default reducer;