import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store'
import { addRssSource } from './store/rss-source/actions';
import { RssSource } from './store/rss-source/types';



[
  {
    id: 'une-inter',
    label: 'La Une International',
    url: 'https://www.lemonde.fr/international/rss_full.xml'
  },
  {
    id: 'une-fr',
    label: 'La Une France',
    url: 'https://www.lemonde.fr/rss/une.xml'
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


