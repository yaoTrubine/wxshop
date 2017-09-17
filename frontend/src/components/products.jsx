import React, { Component } from 'react';
import ProductItem from './productItem';
import AddProduct from './addProduct';
import { getProducts, deleteProducts } from './constants/api';
import style from '../utils/App.css';

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
        getProducts,deleteProducts
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

    oneditProduct(id){
        console.log(id);

    }

    async ondeleteProduct(id){
        this.setState({
            loading : true
        })
        const data = await this.props.deleteProducts(id);
        console.log(data);
        setTimeout(() => this.setState({loading: false,products : data.products}), 1000);
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
               <div className={style.productContainer}>
                    <button className="btn btn-default col-sm-offset-10" onClick={this.toggleForm}>添加商品</button>
                    <AddProduct 
                    show={this.state.isOpen}
                    onClose={this.toggleForm}
                    />

                    {(loading) 
                    ? <div className="loading">Loading</div>
                    :(!products.length)
                    ? <div className="message">没有产品</div>
                    : 
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>名字</th>
                                <th>价格</th>
                                <th>分类</th>
                                <th>数量</th>
                                <th>图片</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((product,i) => 
                        <ProductItem key={i} product={product} oneditProduct={this.oneditProduct.bind(this)} ondeleteProduct={this.ondeleteProduct.bind(this)} /> )}
                        </tbody>
                        </table>
                    }
                </div>
            </div>
        )
    }
}