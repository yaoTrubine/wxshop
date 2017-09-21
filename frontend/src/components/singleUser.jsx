import React,{Component} from 'react';


class SingleUser extends Component {
    render(){
        let singleUser = this.props.user;
        return(
            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <div className="thumbnail">
                    <img src={singleUser.avatarUrl} alt={singleUser.nickName}/>
                        <div className="caption">
                            <h4>{singleUser.nickName}</h4>
                            <p>{singleUser.openId}</p>
                            {(singleUser.gender == 1)
                            ?<p>男</p>
                            :<p>女</p>
                            }
                            <p>{singleUser.language}</p>
                            <p>{singleUser.city}</p>
                            <p>{singleUser.province}</p>
                            <p>{singleUser.country}</p>
                            <p><a onClick={this.handleEidt} className="btn btn-primary" role="button">修改价格</a> <a onClick={this.handleDelete} className="btn btn-default" role="button">Button</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleUser;