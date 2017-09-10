import React, {Component} from 'react';


export default class ProductItem extends Component{
    
    render(){
        let product = this.props.product;
        return(
            <dl>
                <dt><strong>name:</strong></dt>
                <dd>{product.name}</dd>
                <dt><strong>price:</strong></dt>
                <dd>{product.price}</dd>
                <dt><strong>category:</strong></dt>
                <dd>{product.category}</dd>
                <dt><strong>amount:</strong></dt>
                <dd>{product.amount}</dd>
                <dt><strong>images</strong></dt>
                <dd>{product.images}</dd>
                <br />
            </dl>
        )
    }
}