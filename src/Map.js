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
        mapIsReady:false,
        markers:[],
        infoWindows:[]
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
				this.initMap();
                this.showLocMarkers(this.props.mapLocations);
			}
      //handle error case
      script.onerror = () => {
        let h3 = document.createElement('h3');
        h3.innerText="Ooops...Fail to load Google Map."
        this.map_e.current.appendChild(h3);
      }
		}
	}

	initMap=()=>{
     this.map = new window.google.maps.Map(this.map_e.current, {
			          center: this.loc_HK,
			          zoom: 11
		        });
     this.setState({mapIsReady:true});
	};

	showLocMarkers = (locations) =>{
		let markers = [];
        let infoWindows = [];
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
          let largeInfowindow = new window.google.maps.InfoWindow({maxWidth:200});
          infoWindows.push(largeInfowindow);
          // Create an onclick event to open the large infowindow at each marker
          // and add bounce animation to markers.
          marker.addListener('click', ((marker,largeInfowindow)=>{
            return ()=>{

              this.toggleBounce(marker);
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
        this.setState({markers:markers,infoWindows:infoWindows});
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

            // clear other opening infoWindow, only one can open at a time
          this.state.infoWindows.map(infoWindows=>infoWindows.close());
          infowindow.setContent('');
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', ()=>{
            infowindow.marker = null;
          });

          this.wikiSearch(marker.title,infowindow);

          // Open the infowindow on the correct marker.
          infowindow.open(this.map, marker);

    }

    wikiSearch=(keyword,infowindow)=>{
      fetch(`https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${keyword}`)
      .then((res)=>res.json()).catch(()=>infowindow.setContent('<div>Error to Retrieve Info from Wiki....</div>'))
      .then((data)=>{
          try{
            let result = Object.values(data.query.pages);
            let content = result[0]["extract"].substring(0,300)+"...";
            infowindow.setContent('<div><b>' + keyword + '</b></div><p>'+content+'</p><div><i>extracted from Wikipedia.org</i></div>');
          }
          catch(err){infowindow.setContent('<div><b>' + keyword + '</b></div><div>No information is found.</div>')}
      })
    }
    //set animation to the markers while clicking on them
    toggleBounce=(target_marker) =>{
        let markers = this.state.markers;
        if (target_marker.getAnimation() !== null) {
          target_marker.setAnimation(null);
        } else {
          if (markers.length>0){
            markers.forEach((marker)=>{
              marker.setAnimation(null);
            });
          }
          target_marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
    }

    triggerMapMarkerClickFrMenu=(selectedMarkerName,markersOnMap)=>{
      let selectedMarkerOnMap=null;
      if (selectedMarkerName!==""&& markersOnMap.length>0){
        selectedMarkerOnMap = markersOnMap.filter((marker) => marker.title===selectedMarkerName);
        if(selectedMarkerOnMap!==null){
          window.google.maps.event.trigger(selectedMarkerOnMap[0],'click');
        }
      }
    }

    hideMarkers=(loc)=>{
        let allMarkers=this.state.markers;
        let match = false;
        for(let i=0;i<allMarkers.length;i++){
            for(let j=0;j<loc.length;j++){
                if(loc[j].title.toLowerCase()===allMarkers[i].title.toLowerCase())
                    match=true;
            }
            if(match===true)
                allMarkers[i].setMap(this.map);
            else
                allMarkers[i].setMap(null);
            match=false;
        }
    }

	render(){
    // hide the location markers according to the search menu filtering
    this.hideMarkers(this.props.mapLocations);
    //trigger the map location marker by clicking the corresponding text label on search menu
    this.triggerMapMarkerClickFrMenu(this.props.selectedLocation,this.state.markers);
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