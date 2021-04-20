import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


const purchaseBurgerSuccess = (orderId,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData:orderData,
        id:orderId
    }
}

const purchaseBurgerFail = (error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:true
    }
}

const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (order) => {
     return dispatch => {
         dispatch(purchaseBurgerStart());
        axios.post("/orders.json",order)
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.name,order));
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error));
        })
     }
 }

 export const clearState=()=>{
     return {
         type:actionTypes.CLEAR_STATE
     }
 }

const fetchOrdersSuccess = (orders) => {
     return {
         type:actionTypes.FETCH_ORDERS_SUCCESS,
         orderData:orders
     }
 }
 const fetchOrdersFail = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
const fetchOrdersStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get("/orders.json").then(res=>{
            console.log(res.data);
            const fetchedOrder=[];
            for(let key in res.data){
                console.log("key = ",res.data[key]);
                fetchedOrder.push({
                    ...res.data[key],
                    id:key
                    
                });
                
            }
            dispatch(fetchOrdersSuccess(fetchedOrder));
        })
        .catch(err=>{
            dispatch(fetchOrdersFail());
        })
    }
}