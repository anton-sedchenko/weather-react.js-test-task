import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './language/language';
import './index.css';
import 'antd/dist/antd.css';
import App from './components/app/App';
import 'bootstrap/dist/js/bootstrap.js';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
