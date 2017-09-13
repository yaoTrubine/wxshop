import React, { Component } from 'react';
import ProductItem from './productItem';
import AddProduct from './addProduct';

export default class Products extends Component{
    constructor(){
        super();
        this.state = {
            isOpen : false
        }
    }
    toggleForm = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    getProducts(){
        fetch('http://localhost:8000/api/products')
        .then(res => {
            console.log(res);
        })
    }
    componentWillMount(){
        this.getProducts();
    }
    render(){
        // let productItem;
        // productItem = this.props.products.map(product => {
        //     return <ProductItem key={product.name} product={product} />
        // })
        return(
            <div>
                <h1>产品列表</h1>
                <button onClick={this.toggleForm}>添加商品</button>
                <AddProduct 
                show={this.state.isOpen}
                onClose={this.toggleForm}
                />

            </div>
        )
    }
}