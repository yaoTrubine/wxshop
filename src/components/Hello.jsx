import React from 'react';
import {Switch, Route} from 'react-router-dom';
import User from './User';
import AddProduct from './addProduct';


const Hello = () => (
    <main>
        <Switch>
        <Route exact path='/' component={AddProduct} />
            <Route path='/user' component={User} />
            <Route render={()=>(<p>No Found</p>)} />
        </Switch>
    </main>
)

export default Hello;
