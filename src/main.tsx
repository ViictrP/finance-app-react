import './global.css';
import 'tw-elements';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
);
