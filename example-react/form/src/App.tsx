import React from 'react';
import './App.css';
import AppPlayContext from './app-context/AppPlayContext';
import AppPlayForm from './app-form/AppPlayForm';
import MyForm from './app-form-custom/MyForm';


function App() {
  return (
    <div className="App">
      <MyForm  />
    </div>
  );
}

export default App;
