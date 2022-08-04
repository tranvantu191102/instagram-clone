import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import store from './redux/store';
import Layout from './Layout/Layout';
import ScreenMobile from './components/Mobile/ScreenMobile';


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './index.css'

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ScreenMobile />
          <div className='mob:hidden'>
            <Layout />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


