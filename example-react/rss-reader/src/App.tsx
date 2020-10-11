import React from 'react';
import './App.css';
import {SourceList} from './components/SourceList';
import {ResultList} from './components/ResultList';
import {ResultDetail} from './components/ResultDetail';

function App() {
  return (
    <div className="app">
      <header>
        RSS Reader
      </header>
      <div className="body">
        <nav className="source-list">
          <SourceList />
        </nav>
        <nav className="result-list">
          <ResultList />
        </nav>
        <main className="result-detail">
          <ResultDetail />
        </main>
      </div>
      <footer>
        <span>footer</span>
      </footer>
    </div>
  );
}

export default App;
