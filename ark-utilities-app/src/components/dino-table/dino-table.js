import React from 'react';
import './dino-table.css';
// import arkUtilitiesApi from '../../services/arkutilities-api';


const API = 'https://arkutilities.azurewebsites.net';
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
        this.setState({ isLoading: true });
        // arkUtilitiesApi.getLostDinos()
        //     .then(dinos => {
        //         this.setState({ dinos: dinos});
        //     });
        debugger;
        fetch(API + DEFAULT_QUERY)
            .then(response => response.json())
            .then(data => 
            {
                debugger;
                this.setState({ dinos: data, isLoading: false });
            });

    }


    render(){
        debugger;
        const dinolis = this.state.dinos.map(dino => 
            <li>{dino.name}</li>
        );

        return (
           <ul>{dinolis}</ul>
        )
    }
}

export default DinoTable;