import React from 'react';
import _ from 'lodash';


class MainDinoTable extends React.Component {
    constructor() {
        super();
        
        this.state = {isSearching: false, dinos: [], err: '', searchparam : ''};
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
        this.setState({searchparam : e.target.value});
    }



    handleSearchClick(e) {
        
        e.preventDefault();

        const API = 'https://arkutilities-api.azurewebsites.net';
        const DEFAULT_QUERY = '/api/arkutilities/';
        const path = API + DEFAULT_QUERY + this.state.searchparam;

        this.setState({isSearching: this.state.searchparam});
       
        console.log(' fetching with url',path);
        try {
            fetch(path)
                .then(response => response.json())
                .then(data => 
                {
                    console.log('finished fetching with url',path);
                    this.setState({ dinos: data, isSearching: false, error: '' });
                });
        } catch(err) {
          console.log(err); // Failed to fetch
          this.setState({isSearching: false, error: err});
        }
        
    }

    render(){
        const sortedList = this && this.state && this.state.dinos && this.state.dinos.length && _.sortBy(this.state.dinos, ['sheet','tribe','class','name']);
        return (
            <div>
                <form>
                    <input type="text" className="textbox" placeholder="Search"  onChange={this.handleTextChange} />
                    <input title="Search" value="" type="submit" className="button" onClick={this.handleSearchClick} />
                </form>

                        
                 
                
                {this.state.error && <div>{this.state.error}</div>}


                {this.state.isSearching &&
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                
          
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Class</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Tribe</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Level</th>
                                    <th scope="col">Location</th>  
                                    <th scope="col">Status</th>
                                    <th scope="col">TamedBy</th>
                                    <th scope="col">Found In</th>
                                </tr>
                            </thead>
                            {(sortedList && sortedList.length >= 1) && 
                                sortedList.map((dino, index) => 
                                <tbody>
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{dino.class}</td>
                                        <td>{dino.name}</td>
                                        <td>{dino.tribeName}</td>
                                        <td>{dino.gender}</td>
                                        <td>{dino.level}</td>
                                        <td>Lat:{dino.x.toFixed(2)};Lng:{dino.y.toFixed(2)}</td>
                                        <td>{dino.status}</td>
                                        <td>{dino.tamerString}</td>
                                        <td>{dino.sheet}</td>
                                    </tr>
                            </tbody>)}
                        </table>
                
            </div>
        );
    }
}

export default MainDinoTable;



