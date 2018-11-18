import React, { Component } from 'react';

class MyMap extends Component {

	constructor(props){
    super(props);

    this.map = React.createRef();
  }

	componentDidMount() {
		this.loadGoogleMap();
	}

	loadGoogleMap(){
		let mapDOM = document.querySelector("#google-map")
		console.log("map in DOM:" +mapDOM);
		if(!mapDOM){
			let script = document.createElement('script');
			let apiKey = "AIzaSyA6XSB6rNPkeb9op-UCg2dt21cq2QM2Mv8";
			script.src="https://maps.googleapis.com/maps/api/js?key="+apiKey+"&v=3";
			script.async = true;
			script.defer = true;
			script.id="google-map";
			document.body.appendChild(script);
			script.onload = () => {
				console.log("load succesfully");
				this.initMap();
			}
		}
	}

	initMap(){
		 let map = new window.google.maps.Map(this.map.current, {
			          center: {lat: 40.7413549, lng: -73.9980244},
			          zoom: 13
		        });
		 console.log(map);
	};

	render(){
		return(
			<div id="map" ref={this.map}></div>
		)
	}
}



export default MyMap