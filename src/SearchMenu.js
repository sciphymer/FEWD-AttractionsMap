import React, { Component } from 'react';
class SearchMenu extends Component {

	constructor(props){
		super(props);
		this.state = {
			query:[],
			searchInput:""
		}
	}

	render(){
		let showMenu = this.props.showSearchMenu;
		let mapLocation = this.props.mapLocations;
		return(
			<div className={`location-menu ${showMenu?"open":""}`}>
				<p className="location-menu-title">
					Hong Kong Attractions
				</p>
				<div className="search-bar">
					<input type="text" placeholder="Attractions Location"/>
					<button onClick={this.props.doLocationFilter}>Filter</button>
				</div>
				<li>
				{mapLocation.map((location)=>{
					return(
					<ul className="locationList" onClick={(e)=>{this.props.selectedLocationHandler(e.target.innerText)}}
					>{location.title}</ul>
					)
				})}
				</li>
			</div>
		)
	}
}

export default SearchMenu