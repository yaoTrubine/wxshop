import React, {Component} from 'react';
import FileUpload from './fileUpload';
import FileItem from './fileItem';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'qfy5dpel';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/linycc/image/upload';

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
    //传商品
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
        },() => {
            request.post('http://localhost:8000/api/products')
                   .send(this.state.newProduct)
                   .end(err => {
                       console.log(err);
                   })
        });
    }
    //传图片
    handleOnDrop(file){
        console.log(file);
        let filename = file.map(f => {
            return f.name;
        })
        this.setState({
            imagesDetail : file,
            images : filename
        })
        file.forEach(f => {
            this.handleImageUpload(f);
        })
    }

    handleImageUpload(file){
        let uploadImage = request.post(CLOUDINARY_UPLOAD_URL)
                                 .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                                 .field('file', file);
        
        uploadImage.end((err,res) => {
            if(err){
                console.log(err);
            }
            console.log(res);
        })
       
    }

    render(){
        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        })
        if(!this.props.show){
            return null;
        }
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
          };
          const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
          };
        return (
            <div className="back" style={backdropStyle}>
                <div className="form" style={modalStyle}>
                <button className="close" onClick={this.props.onClose}>
                    关闭
                </button>
                
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
            </div>
        )
    }
}