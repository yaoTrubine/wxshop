import React, {Component} from 'react';
import { getUsers } from './constants/api';
import SingleUser from './singleUser';
//用户页面
class User extends Component {
    constructor(){
        super();
        this.state = {
            loading : false,
            users : []
        }

    }
    static defaultProps = {
        getUsers
    }
    async componentDidMount(){
        this.setState({
            loading : true,
        })
        const data = await this.props.getUsers();
        setTimeout(() => this.setState({loading : false,users: data.users}));
    }
   render(){
       const { loading, users} = this.state;
        return(
            <div>
                <h1>用户列表</h1>    
                {(loading)
                ?<div className="loading">Loading</div>
                :(!users.length)
                ?<div className="message">没有用户</div>
                :<div className="users">
                    {users.map( (user,i) => 
                        <SingleUser key={i} user={user} />
                    )}    
                </div>}
            </div>
        )
   }
}


export default User;