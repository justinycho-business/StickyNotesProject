import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { CanvasProvider } from "./components/CanvasContext";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <CanvasProvider>
    <Provider store={store}>
        <App />
      </Provider>
      </CanvasProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
