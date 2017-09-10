import React, { Component } from 'react';

class ProjectItem extends Component {
    deleteProject(id){
        this.props.onDelete(id);
    }
    render() {
        return (
         <li>{this.props.project.title} - {this.props.project.category} 
             <a href="#" onClick={this.deleteProject.bind(this,this.props.project.id)}>X</a>
        </li> 
        );
    }
}

export default ProjectItem;