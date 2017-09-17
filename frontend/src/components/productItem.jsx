import React, {Component} from 'react';
import style from '../utils/App.css';

//详细产品
export default class ProductItem extends Component{
    editProduct(id){
        this.props.oneditProduct(id);
    }

    deleteProduct(id){
        this.props.ondeleteProduct(id);
    }
    
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
                    <a onClick={this.editProduct.bind(this, product._id)} className="btn btn-info btn-sm">编辑</a>
                    <a onClick={this.deleteProduct.bind(this, product._id)} className="btn btn-danger btn-sm">删除</a>
                </td>
            </tr>
            
        )
    }
}