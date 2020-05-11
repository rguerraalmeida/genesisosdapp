import React from 'react';
import './main-panel.css';
import mapsdata from '../../data/maps.json';



class MainPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedMap:null, highlightedMap:null};  
        this.handleChange = this.handleChange.bind(this);
        //this.setState({comment: 'Hello'});
    }

    handleChange(e) {
        this.setState({selectedMap: e.target.value});
    }

    render(){
        const maps = mapsdata.map((element) => 
        <div className='main-panel-item' id={element.id}>
            <a href="#" onClick="console.log('The link was clicked.'); return false">
                <img src={element.wikiLogo} alt=""/>
                <div className="text">{element.name}</div>
            </a>
        </div>);


        return (
            <div className="main-panel">
                {/* <input type="checkbox" id="pure-toggle-5" hidden /> */}
                {maps}
            </div>
        );
    }
}

export default MainPanel;
