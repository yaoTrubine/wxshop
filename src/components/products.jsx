import React, { Component } from 'react';
import ProductItem from './productItem';

export default class Products extends Component{
    render(){
        let productItem;
        productItem = this.props.products.map(product => {
            return <ProductItem key={product.name} product={product} />
        })
        return(
            <div>
                <h1>My products</h1>
                {productItem}
            </div>
        )
    }
}