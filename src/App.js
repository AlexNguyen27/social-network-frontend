import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import jwt_decode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
// import { logoutUser } from './actions/auth';
// import { AUTHENTICATE, AUTHENTICATE_STUDENT } from './actions/types';
// Components

// import Navbar from './components/layout/Navbar';
// import Landing from './components/layout/Landing';
// import Footer from './components/layout/Footer';
// import RouterList from './components/layout/RouterList';

// import './css/App.css';

// Check if token is expired
if (localStorage.token) {
  // const decoded = jwt_decode(localStorage.token);
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   store.dispatch(logoutUser());
  // } else {
  //   if (!decoded.studentId) {
  //     store.dispatch({
  //       type: AUTHENTICATE,
  //       user: decoded,
  //       token: localStorage.token,
  //     });
  //   } else {
  //     store.dispatch({
  //       type: AUTHENTICATE_STUDENT,
  //       user: decoded,
  //       token: localStorage.token,
  //     });
  //   }
  // }
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            <h1>hello</h1>
            {/* <Navbar />
            <Landing />
            <RouterList />
            <Footer /> */}
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
