import React, { Component } from 'react';
import SearchMenu from './SearchMenu.js';
import MyMap from './Map.js';
import './App.css';

class MyNeighborhoodApp extends Component {

  constructor(props){
    super(props);

    this.state = {
      locations:{},
      showSearchMenu:false,
      selectedLocation:""
     }
  }

  selectedLocationHandler=(name)=>{
      // let currentState=this.state.selectedLocation;
      // console.log("currentState="+currentState);
      // if (currentState!==name){
        this.setState({selectedLocation:name});
      //   console.log(this.state.selectedLocation);
      // }
  }

  componentWillMount() {
      this.getLocationAll();
  }

  toggleShowSearchMenu=()=>{
    let currentState=this.state.showSearchMenu;
    currentState?this.setState({showSearchMenu:false}):this.setState({showSearchMenu:true});
  }

  getLocationAll=()=>{
    let loc = require('./allLocations.json');
    this.setState({locations:loc.locations});
  }



  render() {
    return (
          <div className="app">
              <SearchMenu
                  mapLocations={this.state.locations}
                  showSearchMenu={this.state.showSearchMenu}
                  selectedLocationHandler={this.selectedLocationHandler}
              />
              <MyMap
                  mapLocations={this.state.locations}
                  toggleShowSearchMenu={this.toggleShowSearchMenu}
                  selectedLocation={this.state.selectedLocation}
              />
          </div>
    );
  }
}

export default MyNeighborhoodApp;
