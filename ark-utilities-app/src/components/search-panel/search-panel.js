import React from 'react';
import './search-panel.css';
import MapsFilterPanel from '../maps-filter-panel/maps-filter-panel';

function SearchPanel() {
    return (
        <React.Fragment>
            <form>
                <input type="text" className="textbox" placeholder="Search" />
                <input title="Search" value="" type="submit" className="button" />
                <MapsFilterPanel />
            </form>
        </React.Fragment>
  );
}

export default SearchPanel;


