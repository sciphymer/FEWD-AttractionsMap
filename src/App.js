import React, { Component } from 'react';
import SearchMenu from './SearchMenu.js';
import MyMap from './Map.js';
import './App.css';

class MyNeighborhoodApp extends Component {

  constructor(props){
    super(props);
    console.log("Hello")
  }

  componentDidMount() {

  }

  render() {
    return (
          <div className="app">
              <SearchMenu/>
              <MyMap/>
          </div>
    );
  }
}

export default MyNeighborhoodApp;
