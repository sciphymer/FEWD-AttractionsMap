import React, { Component } from 'react';

class TestApp extends Component {

  constructor(props){
    super(props);
    console.log("Hello")
  }

  componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        this.loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyA6XSB6rNPkeb9op-UCg2dt21cq2QM2Mv8&v=3&callback=initMap')
  }

  initMap= () =>{
        new this.google.maps.Map(this.refs.map.getDOMNode(), {
center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13
        });
    }

    loadJS = (src) =>{
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
    }

  render() {
    return (
        <div>
          <div ref="map" style="height: '500px', width: '500px'">
          </div>

        </div>
    )
  }
}

export default TestApp;