import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AuthExample from './components/auth1';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
<BrowserRouter>
    <AuthExample />
</BrowserRouter>
), document.getElementById('root'));
