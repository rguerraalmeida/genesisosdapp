import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPanel from './components/main-panel/main-panel';
import SearchPanel from './components/search-panel/search-panel';
import DinoTable from './components/dino-table/dino-table';
import DinoSheetService from './services/dino-sheet-reader';

function App() {
  return (
    <div className="App">
      <MainPanel />
      <SearchPanel />
      <DinoTable dinos = { DinoSheetService('dummy') } />

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
