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
        this.setState({ isLoading: true });
        // arkUtilitiesApi.getLostDinos()
        //     .then(dinos => {
        //         this.setState({ dinos: dinos});
        //     });

        const path = API + DEFAULT_QUERY;
        console.log('calling fetch with url',path)
        try {
            fetch(API + DEFAULT_QUERY);
          } catch(err) {
            alert(err); // Failed to fetch
          }
        
            // .then(response => response.json())
            // .then(data => 
            // {
            //     this.setState({ dinos: data, isLoading: false });
            // });

    }


    render(){
        // const dinolis = this.state.dinos.map(dino => 
        //     <li>{dino.name}</li>
        // );

        return (
        //    <ul>{dinolis}</ul>
           <ul><li>Rui</li></ul>
        )
    }
}

export default DinoTable;