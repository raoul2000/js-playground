import React from 'react';
import './App.css';
import AppPlayContext from './app-context/AppPlayContext';
import AppPlayForm from './app-form/AppPlayForm';
import MyFormWrapper from './app-form-redux/MyFormWrapper';
//import MyForm from './app-tabbed-form/MyForm';
//import MyForm from './app-form-autocomplete/MyForm';
//import MyForm from './app-form-custom/MyForm';
//import MyForm from './app-formik/MyForm';



function App() {
  return (
    <div className="App">
      <MyFormWrapper />
    </div>
  );
}

export default App;
