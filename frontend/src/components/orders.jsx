import React, { Component } from 'react';
import { getOrders } from './constants/api';


class Order extends Component {
    constructor(){
        super();
        this.state = {
            loading : false,
            users : []
        }

    }
    static defaultProps = {
        getOrders
    }
    async componentDidMount(){
        this.setState({
            loading : true,
        })
        const data = await this.props.getOrders();
        setTimeout(() => this.setState({loading : false,users: data.users}));
    }
   render(){
       const { loading, users} = this.state;
        return(
            <div>
                <h1>订单列表</h1>    
                {(loading)
                ?<div className="loading">Loading</div>
                :(!users.length)
                ?<div className="message">没有订单</div>
                :<div className="users">
                  
                </div>}
            </div>
        )
   }
}

export default Order;