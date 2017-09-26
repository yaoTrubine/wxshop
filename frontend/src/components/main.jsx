import React from 'react';
import {Switch, Route} from 'react-router-dom';
import User from './User';
import Products from './products';
import Order from './orders';
//路由主题
const Main = () => (
    <main className="col-xs-12 col-md-10">
        <Switch>
            <Route exact path='/' component={Products} />
            <Route path='/user' component={User} />
            <Route path='/order' component={Order} />
            <Route render={()=>(<p>No Found</p>)} />
        </Switch>
    </main>
)

export default Main;
