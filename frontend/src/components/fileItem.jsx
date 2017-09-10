import React, {Component} from 'react';

export default class FileItem extends Component{
    render(){
        let f = this.props.file;
        return(
            <li>
                <img src={f.preview} />
                <span>{f.name} - {f.size}bytes</span>
            </li>
        )
    }
}