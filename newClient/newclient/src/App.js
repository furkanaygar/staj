import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Edit from './components/Edit';
import NavigationBar from './components/NavigationBar';
import { Layout } from 'antd';

const App = props => {
  return (
    <Router>
      <div>
        <Layout>
          <NavigationBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/api/login' component={LoginForm} />
            <Route path='/about' component={Edit} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
