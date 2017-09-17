import React, {Component} from 'react';
import FileUpload from './fileUpload';
import FileItem from './fileItem';
import request from 'superagent';
import CustomToolbarEditor from './customToolbarEditor';
import style from '../utils/App.css';


const CLOUDINARY_UPLOAD_PRESET = 'qfy5dpel';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/linycc/image/upload';

export default class AddProduct extends Component {
    constructor(props){
        super(props);
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
            console.log(this.state.newProduct);
            request.post('http://localhost:8000/api/products')
                   .send(this.state.newProduct)
                   .end(err => {
                       if (err) 
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
            maxWidth: 800,
            height : 550,
            margin: '0 auto',
            padding: 30,
            overflowY: 'scroll'
          };
        return (
            <div className="back" style={backdropStyle}>
                <div className="form" style={modalStyle}>
                <div className={style.modalHeader}>
                    <button type="button" className="close" onClick={this.props.onClose}>
                        &times;
                    </button>
                    <h2 className="modal-title">上传商品</h2>
                </div>
                <div className={style.addProduct}>
                    <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label className="col-lg-2 control-label" htmlFor="inputName">商品名称</label>
                            <div className="col-lg-10">
                                <input id="inputName" className="form-control" type="text" ref="name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-2 control-label" htmlFor="">商品价格</label>
                            <div className="col-lg-10">
                                <input className="form-control" type="number" ref="price" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-2 control-label" htmlFor="select">商品类别</label>
                            <div className="col-lg-10">
                            <select className="form-control" name="" id="select" ref="category">
                                {categoryOptions}
                            </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-2 control-label" htmlFor="">商品数量</label>
                            <div className="col-lg-10">
                            <input className="form-control" type="number" ref="amount" />
                                
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-2 control-label" htmlFor="">上传产品图片</label>
                                <div className="col-lg-10">
                                <FileUpload onDrop={this.handleOnDrop.bind(this)} name="images" ref="images" />
                                <aside className="fileReader">
                                    <h5>已传文件</h5>
                                    <ul>
                                        {
                                            this.state.imagesDetail.map(f => 
                                                <FileItem key={f.name} file={f} />
                                            )
                                        }
                                    </ul>
                                </aside>
                                </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-2 control-label" htmlFor="">商品描述</label>
                            <div className="col-lg-10">
                                <CustomToolbarEditor />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-lg-10 col-lg-offset-2">
                                <input className="form-control" className="btn btn-default btn-block" type="submit" value="提交" />
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}