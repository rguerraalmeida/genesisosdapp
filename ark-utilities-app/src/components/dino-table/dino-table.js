import React from 'react';
import './dino-table.css';
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
        debugger;
        try {
          fetch(API + DEFAULT_QUERY);
          // .then(response => response.json())
          // .then(data => 
          // {
          //     this.setState({ dinos: data, isLoading: false });
          // });
        } catch(err) {
          console.log(err); // Failed to fetch
        }
    }


    render(){
        const unsortedDinoList = this.state.dinos.map(dino => <li>{dino}</li>);

        return (
           <ul>{ unsortedDinoList }</ul>
        )
    }
}

export default DinoTable;