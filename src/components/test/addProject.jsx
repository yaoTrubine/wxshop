import React, { Component } from 'react';
import uuid from 'uuid';

class AddProject extends Component {
    constructor(){
        super();
        this.state = {
            newProject : {}
        }
    }
    static defaultProps = {
        categories : ['web desgin', 'web development', 'mobile development']
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.refs.title.value === ''){
            alert('title is invalid');
        }else{
            this.setState({
                newProject : {
                    id : uuid.v4(),
                    title : this.refs.title.value,
                    category : this.refs.category.value
                }
            }, function(){
                this.props.addProject(this.state.newProject);
            })
        }
    }
    render() {
        let categoryOptions = this.props.categories.map(categroy => {
            return <option key={categroy} value={categroy}>{categroy}</option>
        })
        return (
        <div>
            <hr />
            <h3>Add project</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>

            <div>
                <label htmlFor="">Title</label><br />
                <input type="text" ref="title" />
            </div>
            <div>
                <label htmlFor="">Category</label><br />
                <select type="text" ref="category">
                    {categoryOptions}
                </select>
            </div>
            <input type="submit" value="Submit" />
            </form>
        </div>
        );
    }
}

export default AddProject;