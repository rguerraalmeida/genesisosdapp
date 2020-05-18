import React from 'react';
import './App.css';

import SearchPanel from './components/search-panel/search-panel';
import DinoTable from './components/dino-table/dino-table';
import MainDinoTable from './components/main-dino-table/main-dino-table';
// import DinoSheetService from './services/dino-sheet-reader';
// import DinosRepository from './services/dino-sheet-reader';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="#">UK PvE No mods | Dino search utility</a>
      </nav>
    
      <div className="container-fluid">
        <div className="row no-gutters">
          {/* <div className="col-2 d-none d-sm-block">
            <MainPanel />
          </div> */}
          {/* <div className="col-10">
            <div className="row no-gutters" >
              <SearchPanel />
            </div>
            <div className="row no-gutters" >
              {<DinoTable />}
              
            </div>
          </div> */}
          <div className="col-12">
            <MainDinoTable />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
