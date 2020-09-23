import React from 'react';
import axios from 'axios';
import './main-dino-table.css';
import _ from 'lodash';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import cryopod from '../../images/cryopod.png'; // Tell webpack this JS file uses this image


class MainDinoTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isSearching: false, 
            originalDinosData: [], 
            filteredDinosData: [], 
            err: '', 
            searchparam : '', 
            firstRender: true,
            searchOption: [[],[]],
            filteredOptions: [[],[]],
        };

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleTextChange(e) {
        this.setState({searchparam : e.target.value});
    }

    handleFilterChange(options) {
        debugger
        if (!options || !this.state.originalDinosData || this.state.originalDinosData.length == 0) return;
        this.setState({filteredOptions : options}); 

        const filtered = this.state.originalDinosData;

        if (options[0].length > 0) 
        {
            filtered = _.differenceWith(filtered, options[0],  ({ sheet }, map) => sheet === map);
        }

        if (options[1].length > 0) 
        {
            filtered = _.differenceWith(filtered, options[1],  ({ sheet }, map) => sheet === map);
        }

        this.setState({filteredDinosData : filtered}); 
    }

    handleSearchClick(e) {
        e.preventDefault();

        const API = 'https://arkutilities-api.azurewebsites.net';
        const DEFAULT_QUERY = '/api/arkutilities/';
        const path = API + DEFAULT_QUERY + this.state.searchparam;

        this.setState({isSearching: this.state.searchparam});
       
        try {
            axios.get(path)
                .then(response => {
                    const data = response.data;
                    console.log('finished fetching with url',path);
                        
                    const optionsClasses = data && data.length>0 &&  _.uniq(_.map(data, 'class'));
                    const optionMaps = data && data.length>0 &&  _.uniq(_.map(data, 'sheet'));

                    console.log(JSON.stringify(optionsClasses));                   
                    console.log(JSON.stringify(optionMaps));

                    // const sortedList = (data && data.length && _.sortBy(data, ['sheet','tribe','class','name'])) || [];
                    const sortedList  = data;

                    this.setState({ 
                        isSearching: false, 
                        originalDinosData: sortedList, 
                        filteredDinosData: sortedList,  
                        error: '', 
                        firstRender: false, 
                        searchOption: [optionMaps, optionsClasses], 
                        filteredOptions: [[],[]] 
                    }); 

                    console.log(JSON.stringify(this.state)) ;
                });

        } catch(err) {
          console.log(err); // Failed to fetch
          this.setState({isSearching: false, error: err, firstRender: false});
        }
    }

    
    render(){
        const dinos = this.state.filteredDinosData;

        return (
            <div>
                <form>
                    <input type="text" className="textbox" placeholder="Search"  onChange={this.handleTextChange} />
                    <input title="Search" value="Go" type="submit" className="button" onClick={this.handleSearchClick} />
                </form>

                {/* <div className="d-flex">
                    <DropdownMultiselect
                        options={this.state.searchOption[0]}
                        name="maps"
                        handleOnChange={(selected) => {
                            debugger
                            console.log("maps selected changed, maps", selected);
                            const options = this.state.filteredOptions[1];


                            this.setState({filteredOptions : [selected, options]});
                            this.handleFilterChange(this.state.filteredOptions);
                        }}
                    />
                      <DropdownMultiselect
                        options={this.state.searchOption[1]}
                        name="countries"
                        handleOnChange={(selected) => {
                            debugger
                            console.log("class selected changed", selected);
                            const options = this.state.filteredOptions[0];
                            this.setState({filteredOptions : [ options, selected ]});
                            this.handleFilterChange(this.state.filteredOptions);
                        }}
                    />
                </div> */}


                 {/* search tools  */}
               
                {this.state.error && <div>{this.state.error}</div>}
                {this.state.firstRender && <div>Search by Name, Class, Tribe Name or Map</div>}
                {this.state.isSearching && <span><i className="fa fa-spinner fa-spin"></i></span>} 
               

                {!this.state.isSearching && dinos && dinos.length > 0 && 
                    <div className="text-left">
                        <div>Records Timestamp : {dinos[0].timestamp}</div>
                        <div>This <i class="fa fa-clock-o" aria-hidden="true" /> clock icon means this dino info is outdated and info may not be accurate.</div>
                    </div>}
                    
                    
                    <table className="table table-striped">
                        <thead className="thead-ligth">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" className="text-left">Class</th>
                                <th scope="col" className="text-left">Name</th>
                                <th scope="col" className="text-left">Location (lat/long) </th>  
                                <th scope="col">Tribe//Tamed By</th>
                                <th scope="col">Map</th>
                                <th scope="col">Level</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(dinos && dinos.length >= 1) && 
                            dinos.map((dino, index) => 
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td className="text-left">{dino.class + ' ' + dino.gender  } {dino.status === 'Cryopod' ? <img src="https://gamepedia.cursecdn.com/arksurvivalevolved_gamepedia/3/3e/Cryopod.png?version=2e405207abdfa9a31ebc6bdec5a2b09e" alt="" height='16' width='16' />: '' } {dino.outdated === true ? <i class="fa fa-clock-o" aria-hidden="true" />: '' } </td> 
                                    <td className="text-left">{dino.name}</td>
                                    <td className="text-left">{dino.y.toFixed(1)} // {dino.x.toFixed(1)} </td>
                                    <td>{dino.tamerString && dino.tribeName ? dino.tamerString == dino.tribeName ? dino.tribeName : dino.tribeName +"//"+ dino.tamerString : dino.tamerString}</td>
                                    <td>{dino.sheet}</td>
                                    <td>{dino.level}</td>
                                </tr>
                                )}
                        </tbody>
                    </table>
            </div>
        );
    }
}

export default MainDinoTable;



