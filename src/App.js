import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './pages/home';
import Detail from './pages/detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './common/header';
import Login from './pages/login';
import Write from './pages/write';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/login' exact element={<Login />} />
              <Route path='/write' exact element={<Write />} />
              <Route path='/detail' exact element={<Detail />} />
            </Routes>
          </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
