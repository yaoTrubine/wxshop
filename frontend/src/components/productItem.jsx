import React, {Component} from 'react';
import style from '../utils/App.css';

//详细产品
export default class ProductItem extends Component{
    
    render(){
        let product = this.props.product;

        return(
            <tr className={style.productItm}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.amount}</td>
                <td>{product.images.map((image, i) => {
                        let image_url = 'http://res.cloudinary.com/linycc/image/upload/'+image;
                        return <img key={i} src={image_url} alt="" />
                    }
                        
                    )}</td>
                <td>
                    <a href="#" className="btn btn-info btn-sm">编辑</a>
                    <a href="#" className="btn btn-danger btn-sm">删除</a>
                </td>
            </tr>
            
        )
    }
}