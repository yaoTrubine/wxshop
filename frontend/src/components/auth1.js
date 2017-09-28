import React from 'react'
import {
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import App from './App';

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time
const usernameAndPassword = {
    username : 'admin',
    password : 'admin'
}

const AuthExample = () => (
    <div>
      <AuthButton/>
      <ul>
        <li><Link to="/protected">后台</Link></li>
      </ul>
      <Route path="/login" component={Login}/>
      <PrivateRoute path="/protected" component={App}/>
    </div>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: App, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <App {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)


class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    notice: false
  }
  update = (e) => {
      const target = e.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
          [name] : value
      })
  }

  login = (e) => {
      e.preventDefault();
      const {name, password } = this.state;
      if(name == 'admin' && password == 'admin'){
        fakeAuth.authenticate(() => {
            this.setState({ 
                redirectToReferrer: true,
                notice : false
            });
        })
      }else{
          this.setState({
            notice : true
          })
          return false;
      }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer,notice } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
          <form className="form-horizontal" onSubmit={this.login}>
            <div className="form-group">
                <label className="col-lg-4 control-label" htmlFor="inputName">用户名</label>
                <div className="col-lg-4">
                    <input id="inputName" className="form-control" type="text" name="name" ref="name" onChange={this.update} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-lg-4 control-label" htmlFor="inputName">密码</label>
                <div className="col-lg-4">
                    <input id="inputName" className="form-control" type="password" name="password" ref="password" onChange={this.update} />
                </div>
            </div>
            <div className="form-group">
                <div className="col-lg-12 col-lg-offset-4">   
                <button className="form-control" className="btn btn-default" type="submit">提交</button>
                </div>
            </div>
          </form>
          {(notice)
          ?<div className="col-lg-12 col-lg-offset-4">用户名或密码不对</div>
          :<div></div>}
      </div>
    )
  }
}

export default AuthExample