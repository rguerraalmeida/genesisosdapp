import React from 'react';
import './dino-table.css';


class DinoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dinos: props.dinos || []};  
    }


    render(){
        const dinolis = this.state.dinos.map(dino => 
            <li>{dino.name}</li>
        );

        return (
           <ul>{dinolis}</ul>
        )
    }
}

export default DinoTable;