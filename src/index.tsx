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
import { PlaceholderGenerator } from './types';
import getConfigFromMetaTag from './utils/metaConfig';
import randomRoomName from './utils/randomRoomName';

const configUrl = getConfigFromMetaTag('config-url');
const CONFIG_URL = configUrl ? configUrl : '';

const userData = getConfigFromMetaTag('user-data');
const USER_DATA = userData ? userData : '';

const compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ReduxCompose;
const store = createStore(
  combineReducers({ simplewebrtc: reducer }),
  { simplewebrtc: {} },
  compose(applyMiddleware(Thunk))
);

(window as any).store = store;
(window as any).actions = Actions;
(window as any).selectors = Selectors;

// Force the page to reload after 12 hours
setTimeout(() => {
  window.location.reload(true);
}, 1000 * 60 * 60 * 12);

interface RunConfig {
  roomName: string;
  root: HTMLElement;
  gridPlaceholder?: PlaceholderGenerator;
  haircheckHeaderPlaceholder?: PlaceholderGenerator;
  emptyRosterPlaceholder?: PlaceholderGenerator;
  homepagePlaceholder?: PlaceholderGenerator;
}

const run = ({
  roomName,
  root,
  gridPlaceholder,
  haircheckHeaderPlaceholder,
  emptyRosterPlaceholder,
  homepagePlaceholder
}: RunConfig) => {
  if (CONFIG_URL.endsWith('YOUR_API_KEY')) {
    ReactDOM.render(
      <div className="container" style={{textAlign: 'left'}}>
        <h1>Configuration Setup Needed:</h1>
        <p>Edit <code>public/index.html</code> to add your API key to the configuration URL.</p>
        <p>Visit <a href="https://simplewebrtc.com">simplewebrtc.com</a> to sign up and get an API key.</p>
        <h2>How to set your API key:</h2>
        <p>See the meta tag section marked <code>IMPORTANT SETUP</code> in <code>public/index.html</code>:</p>
        <pre style={{ textAlign: 'left' }}>
          {'<!-- IMPORTANT SETUP -->'}<br />
          {'<!-- Change the YOUR_API_KEY section of the config URL to match your API key -->'}<br />
          {`<meta
  name="simplewebrtc-config-url"
  content="https://api.simplewebrtc.com/config/guest/YOUR_API_KEY"
/>`}
        </pre>
      </div>,
      root
    );
    return;
  }
  ReactDOM.render(
    <Provider store={store}>
      <App
        roomName={roomName}
        configUrl={CONFIG_URL}
        userData={USER_DATA}
        gridPlaceholder={gridPlaceholder ? gridPlaceholder : null}
        haircheckHeaderPlaceholder={
          haircheckHeaderPlaceholder ? haircheckHeaderPlaceholder : null
        }
        emptyRosterPlaceholder={
          emptyRosterPlaceholder ? emptyRosterPlaceholder : null
        }
        homepagePlaceholder={homepagePlaceholder ? homepagePlaceholder : null}
      />
    </Provider>,
    root
  );
};

const loadTemplate = (id: string): DocumentFragment | null => {
  const el = document.getElementById(id);
  if (el !== null && el.nodeName === 'TEMPLATE') {
    return document.importNode((el as HTMLTemplateElement).content, true);
  }

  return null;
};

export default {
  run,
  loadTemplate,
  randomRoomName
};
