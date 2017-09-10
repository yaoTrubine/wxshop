import React, { Component } from 'react';
import Projects from './test/projects';
import AddProject from './test/addProject';
import AddProduct from './addProduct';
import Products from './products';
import Header from './Header';
import Main from './main';
import uuid from 'uuid';
import $ from 'jquery';
import '../utils/App.css';


class App extends Component {
  constructor(){
    super();
    this.state = {
        projects : [],
        products : []
      }
  }

  getTodo(){
    
  }
  
  getProject(){
    this.setState({
      projects : [{
          id : uuid.v4(),
          title : 'bussiness website',
          category : 'webdesign'
      },{
          id : uuid.v4(),
          title : 'social app',
          category : 'web design'
      },{
          id : uuid.v4(),
          title : 'rua bussiness',
          category : 'mobile app'
      }]
    })
  }

  componentWillMount(){
      this.getProject();
  }

  componentDidMount(){

  }

  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({
      projects : projects
    })
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({
      projects : projects
    })
  }

  handleAddProduct(product){
    // console.log(product);
    let products = this.state.products;
    products.push(product);
    this.setState({
      products : products
    })
    // console.log(this.state.products);
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
