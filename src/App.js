import React, { Component } from 'react';
import SearchMenu from './SearchMenu.js';
import MyMap from './Map.js';
import './App.css';

class MyNeighborhoodApp extends Component {

  constructor(props){
    super(props);
    this.state = {
      locations : [
          {title: 'Avenue of Stars', location: {lat: 22.3142951,lng: 114.1758508}},
          {title: 'Golden Bauhinia Square', location: {lat: 22.2921538,lng:114.1667949}},
          {title: 'Jardine Noonday Gun', location: {lat: 22.2825649,lng:114.181561}},
          {title: 'Nan Lian Garden', location: {lat: 22.3391582,lng:114.203164}},
          {title: 'Bruce Lee Mansion', location: {lat: 22.3305513,lng:114.1745777}},
          {title: 'Hong Kong Disneyland Resort', location: {lat: 22.3169947,lng:114.0352293}},
          {title: 'Ocean Park',location:{lat:22.2394013,lng:114.1629642}},
          {title: 'Tian Tan Buddha', location:{lat:22.2547957,lng:113.9026526}},
          {title: 'Mai Po Nature Reserve', location:{lat:22.4811309,lng:114.0529839}},
          {title: 'Temple Street Night Market', location:{lat:22.3065234,lng:114.1677865}}
          ],
      showSearchMenu:false
     }
  }

  componentDidMount() {
  }

  toggleShowSearchMenu=()=>{
    let currentState=this.state.showSearchMenu;
    currentState?this.setState({showSearchMenu:false}):this.setState({showSearchMenu:true});
  }


  render() {
    return (
          <div className="app">
              <SearchMenu
                  mapLocations={this.state.locations}
                  showSearchMenu={this.state.showSearchMenu}
              />
              <MyMap
                  mapLocations={this.state.locations}
                  toggleShowSearchMenu={this.toggleShowSearchMenu}
              />
          </div>
    );
  }
}

export default MyNeighborhoodApp;
