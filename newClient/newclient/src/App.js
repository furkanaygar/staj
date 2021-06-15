import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Edit from './components/Edit';
import NavigationBar from './components/NavigationBar';
import { Layout } from 'antd';
import Logout from './components/Logout';
import Get from './components/Get';
import LeaveForm from './components/LeaveForm';
const x = localStorage.getItem('username');

const App = props => {
  return (
    <Router>
      <div>
        <Layout>
          <NavigationBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/api/login' component={LoginForm} />
            <Route path='/api/logout' component={Logout} />
            <Route path={`/api/users/${x}/edit`} component={Edit} />
            <Route path={`/api/users/${x}`} component={Get} />
            <Route path='/api/leaveform' component={LeaveForm} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
