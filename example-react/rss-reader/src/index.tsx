import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'
import { addRssSource } from './store/rss-source/actions';

[
  {
    id: 'une-societe',
    label: 'La Une Societe',
    url: 'http://localhost:3000/test-response/rss_full_societe.xml'
  },
  {
    id: 'une-planete',
    label: 'La Une Planete',
    url: 'http://localhost:3000/test-response/rss_full_planete.xml'
  },
  {
    id: 'une-sport',
    label: 'La Une Sport',
    url: 'http://localhost:3000/test-response/rss_full_sport.xml'
  },
  {
    id: 'une-politique',
    label: 'La Une Politique',
    url: 'http://localhost:3000/test-response/rss_full_politique.xml'
  },
  {
    id: 'une-div',
    label: 'La Une Divert',
    url: 'https://www.lemonde.fr/rss/sport.xml'
  },
  {
    id: 'libe-1',
    label: 'Libération 1',
    url: 'http://localhost:3000/test-response/libe_1.xml'
  },
  {
    id: 'ofr-1',
    label: 'Ouest France A la Une',
    url: 'http://localhost:3000/test-response/rss-en-continu.xml'
  }
  
].map(source => store.dispatch(addRssSource(source)));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


