import React, {Component} from 'react';
//图片预览
export default class FileItem extends Component{
    render(){
        let f = this.props.file;
        return(
            <li>
                <img src={f.preview} alt={f.name} />
                <span>{f.name} - {f.size}bytes</span>
            </li>
        )
    }
}