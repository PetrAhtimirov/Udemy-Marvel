import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelServise from './services/MarvelService';

import './style/style.scss';

const marvelService = new MarvelServise();

marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

