import React from 'react';
import './search-panel.css';


function SearchPanel() {
    return (
        <form method="post">
            <input type="text" className="textbox" placeholder="Search" />
            <input title="Search" value="" type="submit" className="button" />
        </form>
  );
}

export default SearchPanel;


