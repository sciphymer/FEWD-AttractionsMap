import React, { Component } from 'react';

class HamburgerBtn extends Component{

    constructor(props){
        super(props);
        // this.hamburgerbtn = React.createRef();
        this.state = {
            menuClicked: false
        }
    }

    toggle=()=>{
        let currentState = this.state.menuClicked;
        this.setState({menuClicked:!currentState});
        this.props.toggleShowSearchMenu();
    }
	render(){
        let menuClicked = this.state.menuClicked;
		return (
            <div
                 role="button"
                 onClick={this.toggle}
                 className={`hamburgerbtn ${menuClicked? "change":""}`}
                >
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        )
	}
}

export default HamburgerBtn