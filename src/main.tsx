import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
<<<<<<< HEAD
  <React.StrictMode>
=======
  // TODO: Uncomment
  // <React.StrictMode>
>>>>>>> 4661718d05e2ea3e0a41dff28e68a6bf046e163f
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
<<<<<<< HEAD
  </React.StrictMode>,
=======
  // </React.StrictMode>,
>>>>>>> 4661718d05e2ea3e0a41dff28e68a6bf046e163f
);
