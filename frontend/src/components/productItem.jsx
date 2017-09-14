import React, {Component} from 'react';

//详细产品
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
                <dd>
                    {product.images.map((image, i) => {
                        let image_url = 'http://res.cloudinary.com/linycc/image/upload/'+image;
                        return <img key={i} src={image_url} alt="" />
                    }
                        
                    )}
                </dd>

                <br />
            </dl>
        )
    }
}