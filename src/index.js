import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './static/common.css'
import { BrowserRouter,HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './reducers'



ReactDOM.render((
<Provider store = {store}>
  <HashRouter >
   <Route path='/'  component={App} />
  </HashRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
