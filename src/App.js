import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

// COMPONENT
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import RouterList from './components/layout/RouterList';
import Footer from './components/layout/Footer';

// Check if token is expired
if (localStorage.token) {
}

function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Fragment>
          <Navbar />
          {/* <Landing /> */}
          <RouterList />
          <Footer />
        </Fragment>
      </Router>
    </PersistGate>
  </Provider>
  );
}

export default App;
