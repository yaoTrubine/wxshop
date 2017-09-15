import React, { Component } from 'react';
import ProductItem from './productItem';
import AddProduct from './addProduct';
import { getProducts } from './constants/api';

//产品页面
export default class Products extends Component{
    constructor(context){
        super(context);
        this.state = {
            loading : false,
            isOpen : false,
            products : []
        }
    }
    static defaultProps = {
        getProducts
    }
    toggleForm = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    
    async componentDidMount(){
        this.setState({
            loading : true
        })
        const data = await this.props.getProducts()
        setTimeout(() => this.setState({loading: false,products : data.products}), 2000);
    }
    render(){
        // let productItem;
        // productItem = this.props.products.map(product => {
        //     return <ProductItem key={product.name} product={product} />
        // })
        const {products, loading} = this.state;
        
        return(
            <div>
                <h1>产品列表</h1>
               
                <button onClick={this.toggleForm}>添加商品</button>
                <AddProduct 
                show={this.state.isOpen}
                onClose={this.toggleForm}
                />

                {(loading) 
                ? <div className="loading">Loading</div>
                :(!products.length)
                ? <div className="message">没有产品</div>
                : <ol>
                    {products.map((product,i) => 
                    <ProductItem key={i} product={product} /> )}
                </ol>}
            </div>
        )
    }
}