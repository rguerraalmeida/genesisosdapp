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
        <a className="navbar-brand" href="#">UK PvE No mods | Dino search utility || </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">Seach tool<span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">ASB Guide</a>
              </li>
            </ul>
          </div>
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
