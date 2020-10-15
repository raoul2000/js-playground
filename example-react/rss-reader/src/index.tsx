import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'
import { addRssSource } from './store/rss-source/actions';

[
  {
    id: 'une-inter',
    label: 'La Une International',
    url: 'https://www.lemonde.fr/international/rss_full.xml'
  },
  {
    id: 'une-fr',
    label: 'La Une France',
    url: 'http://localhost:3000/test-response/une.xml'
  },
  {
    id: 'une-sport',
    label: 'La Une Sport',
    url: 'https://www.lemonde.fr/rss/sport.xml'
  },
  {
    id: 'une-politique',
    label: 'La Une Politique',
    url: 'https://www.lemonde.fr/rss/sport.xml'
  },
  {
    id: 'une-div',
    label: 'La Une Divert',
    url: 'https://www.lemonde.fr/rss/sport.xml'
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


