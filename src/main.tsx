import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // TODO: Uncomment
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>,
);
