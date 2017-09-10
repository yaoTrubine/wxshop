import React from 'react';
import { NavLink } from 'react-router-dom';


const Header = () => (
    <header>
        <nav>
            <ul>
                <li><NavLink activeClassName='active' exact to='/'>添加商品</NavLink></li>
                <li><NavLink activeClassName='active' to='/user'>用户列表</NavLink></li>
            </ul>
        </nav>
    </header>
)

export default Header;