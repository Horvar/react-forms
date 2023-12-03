import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import MainPage from './pages/MainPage';
import UncontrolledFormPage from './pages/UncontrolledFormPage';
import ControlledFormPage from './pages/ControlledFormPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/uncontrolled-form" element={<UncontrolledFormPage />} />
          <Route path="/controlled-form" element={<ControlledFormPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
