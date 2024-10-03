import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserRegisterPage from './pages/Register/UserRegisterPage';
import UserLoginPage from './pages/Login/UserLoginPage';
import HomePage from './pages/Home/HomePage';
import PrivateRoute from './components/private/Index';

import NotFound from './components/404Page/Index';
import AlbumPage from './pages/Album/AlbumPage'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="*" element={<NotFound />} />
          {/* Protected Route */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
           
            <Route path="/album/:id" element={<AlbumPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
