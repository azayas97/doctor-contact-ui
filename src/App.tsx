import React from 'react';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import LoginPage from './components/pages/login/login-page';
import Dashboard from './components/pages/dashboard/dashboard-page';
import client from './utils/apollo-client';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
