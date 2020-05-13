import React from 'react';
import './dino-table.css';
import _ from 'lodash';
// import arkUtilitiesApi from '../../services/arkutilities-api';


const API = 'https://arkutilities-api.azurewebsites.net';
const DEFAULT_QUERY = '/api/arkutilities/';

class DinoTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            props: props,
            isLoading: true,
            dinos: []
          };
    }
    
    componentDidMount() {
        const path = API + DEFAULT_QUERY;
        console.log('calling fetch with url',path)
        try {
          fetch(API + DEFAULT_QUERY)
           .then(response => response.json())
          .then(data => 
          {
              debugger
              this.setState({ dinos: data, isLoading: false });
          });
        } catch(err) {
          console.log(err); // Failed to fetch
        }
    }


    render(){
        const sortedList = _.sortBy(this.state.dinos, ['sheet','tribe', 'class','name']);

        const tableRows = this.state.dinos.map((dino, index) => 
          <tr>
            <th scope="row">{index}</th>
            <td>{dino.class}</td>
            <td>{dino.name}</td>
            <td>{dino.tribeName}</td>
            <td>{dino.gender}</td>
            <td>{dino.level}</td>
            <td>{dino.x},{dino.y}</td>
            <td>{dino.status}</td>
            <td>{dino.tamerString}</td>
            <td>{dino.sheet}</td>
          </tr>
        );

        return (
          
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
            <tbody>
              {tableRows}
            </tbody>
          </table>




          // <pre>cenas</pre>
        )
    }
}

export default DinoTable;