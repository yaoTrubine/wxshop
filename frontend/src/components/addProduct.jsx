import React, {Component} from 'react';
import FileUpload from './fileUpload';
import FileItem from './fileItem';

export default class AddProduct extends Component {
    constructor(){
        super();
        this.state = {
            newProduct : {},
            imagesDetail : [],
            images : []
        }
    }
    static defaultProps = {
        categories: ['吃的','穿的','住的','走的']
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({
            newProduct :{
                name : this.refs.name.value,
                price : this.refs.price.value,
                category : this.refs.category.value,
                amount : this.refs.amount.value,
                images :  this.state.images,
            }
        },function(){
            this.props.addProduct(this.state.newProduct);
        })
    }
    handleOnDrop(file){
        let filename = file.map(f => {
            return f.name;
        })
        this.setState({
            imagesDetail : file,
            images : filename
        })
    }
    render(){
        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        })
        return (
            <div>
                <h3>Addd Product</h3>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="">商品名称</label>
                        <input type="text" ref="name" />
                    </div>
                    <div>
                        <label htmlFor="">商品价格</label>
                        <input type="number" ref="price" />
                    </div>
                    <div>
                        <label htmlFor="">商品类别</label>
                        <select name="" id="" ref="category">
                            {categoryOptions}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">商品数量</label>
                        <input type="number" ref="amount" />
                    </div>
                    <div>
                        <label htmlFor="">上传产品图片</label>
                        <FileUpload onDrop={this.handleOnDrop.bind(this)} name="images" ref="images" />
                    </div>
                    <aside>
                    <h5>已传文件</h5>
                    <ul>
                        {
                            this.state.imagesDetail.map(f => 
                                <FileItem key={f.name} file={f} />
                            )
                        }
                    </ul>
                    </aside>
                    <div>
                        <label htmlFor="">商品描述</label>
                    </div>
                        
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}