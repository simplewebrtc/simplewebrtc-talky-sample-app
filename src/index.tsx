import { Actions, reducer, Selectors } from '@andyet/simplewebrtc';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose as ReduxCompose, createStore } from 'redux';
import Thunk from 'redux-thunk';
import App from './App';
import { PlaceholderGenerator } from './types';
import getConfigFromMetaTag from './utils/metaConfig';
import randomRoomName from './utils/randomRoomName';
import Homepage from './screens/Homepage';

const configUrl = getConfigFromMetaTag('config-url');
const CONFIG_URL = configUrl ? configUrl : '';

const userData = getConfigFromMetaTag('user-data');
const USER_DATA = userData ? userData : '';

const compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ReduxCompose;
const store = createStore(
  combineReducers({ simplewebrtc: reducer }),
  { simplewebrtc: {} as any },
  compose(applyMiddleware(Thunk))
);

(window as any).store = store;
(window as any).actions = Actions;
(window as any).selectors = Selectors;

// Fix vh units on mobile:
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVH();
window.addEventListener('resize', setVH);

// Force the page to reload after 3 hours
if (!localStorage.disablePageRefresh) {
  setTimeout(() => {
    window.location.reload(true);
  }, 1000 * 60 * 60 * 3);
} else {
  console.log('Forced page refresh disabled');
}

interface RunConfig {
  roomName: string;
  initialPassword?: string;
  root: HTMLElement;
  gridPlaceholder?: PlaceholderGenerator;
  haircheckHeaderPlaceholder?: PlaceholderGenerator;
  emptyRosterPlaceholder?: PlaceholderGenerator;
  homepagePlaceholder?: PlaceholderGenerator;
  openToPublic: boolean;
  showHostVideo: boolean;
  showVisitorVideo: boolean;
  allowInvites: boolean;
  allowShareScreen: boolean;
  allowWalkieTalkieMode: boolean;
  allowChat: boolean;
}

const run = ({
  roomName,
  initialPassword,
  root,
  gridPlaceholder,
  haircheckHeaderPlaceholder,
  emptyRosterPlaceholder,
  homepagePlaceholder,
  openToPublic = true,
  showHostVideo = true,
  showVisitorVideo = true,
  allowInvites = true,
  allowShareScreen = true,
  allowWalkieTalkieMode = true,
  allowChat = true,
}: RunConfig) => {
  if (CONFIG_URL.endsWith('YOUR_API_KEY')) {
    ReactDOM.render(
      <div className="container" style={{ textAlign: 'left' }}>
        <h1>Configuration Setup Needed:</h1>
        <p>
          Edit <code>public/index.html</code> to add your API key to the configuration URL.
        </p>
        <p>
          Visit <a href="https://simplewebrtc.com">simplewebrtc.com</a> to sign up and get an API
          key.
        </p>
        <h2>How to set your API key:</h2>
        <p>
          See the meta tag section marked <code>IMPORTANT SETUP</code> in{' '}
          <code>public/index.html</code>:
        </p>
        <pre style={{ textAlign: 'left' }}>
          {'<!-- IMPORTANT SETUP -->'}
          <br />
          {'<!-- Change the YOUR_API_KEY section of the config URL to match your API key -->'}
          <br />
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
        initialPassword={initialPassword}
        roomConfig={{
          openToPublic,
          showHostVideo,
          showVisitorVideo,
          allowInvites,
          allowShareScreen,
          allowWalkieTalkieMode,
          allowChat,
        }}
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
