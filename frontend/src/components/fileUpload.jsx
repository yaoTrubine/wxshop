import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


// 上传封面
export default class FileUpload extends Component{
    render(){
        return(
            <section>
                <div className="dropzone">
                    <Dropzone
                        accept=""
                        onDrop={this.props.onDrop}>
                        <p>dropping some files here</p>
                    </Dropzone>
                </div>
            </section>
        )
    }
}