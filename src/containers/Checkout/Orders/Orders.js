import React,{ Component } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";


class Orders extends Component{
    state ={
        orders:[],
        loading:true
    }

    componentDidMount(){
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
            console.log(fetchedOrder);
            this.setState({orders:fetchedOrder, loading:false});
        })
        .catch(err=>{
            this.setState({loading:false});
        })
    }

    render(){
        let order=<Spinner />
        if(!this.state.loading){
            order = this.state.orders.map(ord=>{
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
export default Orders;