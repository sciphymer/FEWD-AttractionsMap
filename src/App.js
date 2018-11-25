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
      selectedLocation:"",
      query:{}
     }
  }

  selectedLocationHandler=(name)=>{
        this.setState({selectedLocation:name});
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
    this.setState({query:loc.locations});
  }

  doLocationFilter=()=>{
    let i_query = document.querySelectorAll(".search-bar>input")[0].value;
    if(i_query==="")
      this.setState({query:this.state.locations})
    else{
      let locationList = this.state.locations;
      let query = locationList.filter(list=> list.title.toLowerCase().includes(i_query.toLowerCase()));
      this.setState({query:query});
    }
  }

  render() {
    return (
          <div className="app">
              <SearchMenu
                  mapLocations={this.state.query}
                  showSearchMenu={this.state.showSearchMenu}
                  selectedLocationHandler={this.selectedLocationHandler}
                  doLocationFilter={this.doLocationFilter}
              />
              <MyMap
                  mapLocations={this.state.query}
                  toggleShowSearchMenu={this.toggleShowSearchMenu}
                  selectedLocation={this.state.selectedLocation}
              />
          </div>
    );
  }
}

export default MyNeighborhoodApp;
