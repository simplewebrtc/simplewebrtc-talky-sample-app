import { Actions, reducer, Selectors } from '@andyet/simplewebrtc';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  combineReducers,
  compose as ReduxCompose,
  createStore
} from 'redux';
import Thunk from 'redux-thunk';
import App from './App';
import './index.css';


// ====================================================================
// !! IMPORTANT SETUP !!
// ====================================================================
// Set this to the API key you received with your SimpleWebRTC account.
// You can visit accounts.simplewebrtc.com to find your API key.
// ====================================================================
const API_KEY: string = '';


const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;

const compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ReduxCompose;
const store = createStore(
  combineReducers({ simplewebrtc: reducer }),
  { simplewebrtc: {} },
  compose(applyMiddleware(Thunk))
);

// These are exposed to make it easier to inspect while debugging and
// learning how SimpleWebRTC works.
(window as any).store = store;
(window as any).actions = Actions;
(window as any).selectors = Selectors;

if (!API_KEY) {
  ReactDOM.render(
    <div>
      <p>Edit src/index.tsx to set your API key.</p>
      <p>Visit <a href="https://simplewebrtc.com">simplewebrtc.com</a> to sign up and get an API key.</p>
    </div>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      <App configUrl={CONFIG_URL} />
    </Provider>,
    document.getElementById('root')
  );
}
