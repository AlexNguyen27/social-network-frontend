import React, { Fragment } from 'react';
// import { connect } from 'react-redux'
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

import './css/index.css';
import { logoutUser } from './store/actions/auth';

// Check if token is expired
if (localStorage.token) {
  const decoded = jwt_decode(localStorage.token.replace('Bearer ', ''));
  const currentTime = Date.now() / 1000;
  console.log(decoded.exp);
  console.log(currentTime);
  console.log(decoded.exp < currentTime);
  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());
  // } else {
  // if (!decoded.studentId) {
  //   store.dispatch({
  //     type: AUTHENTICATE,
  //     user: decoded,
  //     token: localStorage.token
  //   });
  // } else {
  //   store.dispatch({
  //     type: AUTHENTICATE_STUDENT,
  //     user: decoded,
  //     token: localStorage.token
  //   });
  // }
  // }
}

// todo
// create footer with copyright getyear

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            <Navbar />
            <RouterList />
            <Footer />
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
