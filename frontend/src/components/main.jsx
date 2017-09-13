import React from 'react';
import {Switch, Route} from 'react-router-dom';
import User from './User';
import Products from './products';

const Main = () => (
    <main>
        <Switch>
        <Route exact path='/' component={Products} />
            <Route path='/user' component={User} />
            <Route render={()=>(<p>No Found</p>)} />
        </Switch>
    </main>
)

export default Main;
