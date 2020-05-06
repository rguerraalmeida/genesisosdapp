import React from 'react';
import './search-panel.css';



function SearchPanel() {
    return (
        <form method="post">
            <input type="text" class="textbox" placeholder="Search" />
            <input title="Search" value="" type="submit" class="button" />
        </form>
  );
}

export default SearchPanel;


