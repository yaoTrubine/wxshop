import React from 'react';
import {

     NavLink } from 'react-router-dom';

//路由Link
const Header = () => (
    <header className="col-xs-2 col-md-2">
        <nav>
            <div className="btn-group-vertical">
                <NavLink className="btn btn-default" activeClassName='active' to='/protected/product'>商品列表</NavLink>
                <NavLink className="btn btn-default" activeClassName='active' to='/protected/user'>用户列表</NavLink>
                <NavLink className="btn btn-default" activeClassName='active' to='/protected/order'>订单</NavLink>
            </div>
        </nav>
    </header>
)

export default Header;