import './App.css';
import styled from 'styled-components';
import { AccountBox } from './components/accountBox';
import React, { Component } from 'react';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  back-ground: #ff0000;
`;
const Auth = React.lazy(() => {
  return import('./components/accountBox/auth');
});

function App() {
  return (
    <AppContainer>
      <AccountBox />
    </AppContainer>
  );
}

export default App;
