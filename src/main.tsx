import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services/store.ts';
import App from './App.tsx';
// import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './translation/config.ts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // TODO: Uncomment
  // <React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </I18nextProvider>,
  // </React.StrictMode>,
);
