import React,{ Component } from "react";
import Order from "../../../components/Order/Order";
// import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actionTypesOrder from '../../../store/actions/index';


class Orders extends Component{
    state ={
        orders:[],
        loading:true
    }

    componentDidMount(){
        // NOT NEEDED AFTER REDUX ASYNC
        // axios.get("/orders.json").then(res=>{
        //     console.log(res.data);
        //     const fetchedOrder=[];
        //     for(let key in res.data){
        //         console.log("key = ",res.data[key]);
        //         fetchedOrder.push({
        //             ...res.data[key],
        //             id:key
                    
        //         });
                
        //     }
        //     console.log(fetchedOrder);
        //     this.setState({orders:fetchedOrder, loading:false});
        // })
        // .catch(err=>{
        //     this.setState({loading:false});
        // })
        this.props.fetchOrders(this.props.token,this.props.userId);
        // console.log("Orders = ",this.props.orders);
    }

    render(){
        let order=this.props.error?<p>Something went wrong</p>:<Spinner />
        if(!this.props.loading&&!this.props.error){
            order = this.props.orders.map(ord=>{
                return(
                    <Order key={ord.id} ingredients={ord.ingredients} price={ord.price} />
                )
            })
        }

        return(
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders:state.order.orderData,
        loading:state.order.loading,
        error : state.order.error,
        token : state.auth.token,
        userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders : (token,userId) => dispatch(actionTypesOrder.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);