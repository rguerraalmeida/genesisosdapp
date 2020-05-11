import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPanel from './components/main-panel/main-panel';
import SearchPanel from './components/search-panel/search-panel';
import DinoTable from './components/dino-table/dino-table';
// import DinoSheetService from './services/dino-sheet-reader';
// import DinosRepository from './services/dino-sheet-reader';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="#">UK PvE No mods | Dino search utility</a>
      </nav>
    
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-2 d-none d-sm-block">
            <MainPanel />
          </div>
          <div className="col-10">
            <div className="row no-gutters" >
              <SearchPanel />
            </div>
            <div className="row no-gutters" >
              {<DinoTable />}
              
            </div>
          </div>
        </div>
      </div>

     
      
     

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}


   

    </div>
  );
}

export default App;
