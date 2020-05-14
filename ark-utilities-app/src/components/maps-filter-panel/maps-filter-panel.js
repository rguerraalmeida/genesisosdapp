import React, { Component } from 'react';
import './maps-filter-panel.css';
import mapsdata from '../../data/maps.json';

class MapsFilterPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedMap:null, highlightedMap:null};  
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({selectedMap: e.target.value});
    }

    render(){
        const maps = mapsdata.map((element) => 
        <div className='maps-filter-panel-item' id={element.id}>
            <a href="#" onClick="console.log('The link was clicked.'); return false">
                <img src={element.wikiLogo} alt=""/>
                {/* <div className="text">{element.name}</div> */}
            </a>
        </div>);


        return (
            <div className="maps-filter-panel">
                {maps}
            </div>
        );
    }
}

export default MapsFilterPanel;
