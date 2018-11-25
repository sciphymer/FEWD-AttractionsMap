import React, { Component } from 'react';
import HamburgerBtn from './Button.js';
class MyMap extends Component {

	constructor(props){
    super(props);
    this.map_e = React.createRef();
    this.hamburgerbtn = React.createRef();
    this.apiKey = "AIzaSyA6XSB6rNPkeb9op-UCg2dt21cq2QM2Mv8";
    // this.apiKey="";
    this.loc_HK={
    	lat:22.3526735,
    	lng:114.15
    	};
    this.map=null;
    this.state ={
        mapIsReady:false
    }
  }

	componentDidMount() {
		this.loadGoogleMap();
	}

	loadGoogleMap=()=>{
		let mapDOM = document.querySelector("#google-map")
		if(!mapDOM){
			let script = document.createElement('script');
			script.src="https://maps.googleapis.com/maps/api/js?key="+this.apiKey+"&v=3";
			script.async = true;
			script.defer = true;
			script.id="google-map";
			document.body.appendChild(script);
			script.onload = () => {
				console.log("load succesfully");
				this.initMap();
        this.showLocMarkers(this.props.mapLocations);
			}
		}
	}

	initMap=()=>{
     this.map = new window.google.maps.Map(this.map_e.current, {
			          center: this.loc_HK,
			          zoom: 11
		        });
     this.setState({mapIsReady:true});
		 console.log(this.map);
	};

	showLocMarkers = (locations) =>{
    console.log(this.props.locations);
		let markers = [];
		const defaultIcon = this.makeMarkerIcon('0091ff');
		const highlightedIcon = this.makeMarkerIcon('FFFF24');
		for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new window.google.maps.Marker({
            position: position,
            title: title,
            animation: window.google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
          });

          // Push the marker to our array of markers.
          markers.push(marker);
          console.log(markers);
          let largeInfowindow = new window.google.maps.InfoWindow();
          // Create an onclick event to open the large infowindow at each marker.
          marker.addListener('click', ((marker,largeInfowindow)=>{
            return ()=>{
              this.populateInfoWindow(marker, largeInfowindow);
            };
          })(marker, largeInfowindow));
          // Two event listeners - one for mouseover, one for mouseout,
          // to change the colors back and forth.
          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
        }

        let bounds = new window.google.maps.LatLngBounds();
        for(let i=0;i<markers.length;i++){
          markers[i].setMap(this.map);
          bounds.extend(markers[i].position);
        }
        this.map.fitBounds(bounds);
	}

	makeMarkerIcon = (markerColor) => {
        let markerImage = {
          url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          size: new window.google.maps.Size(21, 34),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(10, 34),
          scaledSize: new window.google.maps.Size(21,34)
        }
      return markerImage;
    }
   populateInfoWindow = (marker, infowindow)=>{
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent('');
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', ()=>{
            infowindow.marker = null;
          });
          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options

          infowindow.setContent('<div>' + marker.title + '</div><img id="photo" src="http://flickr.com/photo.gne?id=32150568198"/>');
          // Open the infowindow on the correct marker.
          infowindow.open(this.map, marker);
        }
    }

	render(){
    // if(this.state.mapIsReady){
    //   this.showLocMarkers(this.props.mapLocations);
    // }

		return(
      <div id="map_canva">
        <HamburgerBtn
          toggleShowSearchMenu={this.props.toggleShowSearchMenu}
        />
  			<div id="map" ref={this.map_e}></div>
      </div>
		)
	}
}



export default MyMap