import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Edit from './components/Edit';
import NavigationBar from './components/NavigationBar';
import Logout from './components/Logout';
import LeaveForm from './components/LeaveForm';
import Register from './components/Register';

const App = props => {
  const x = localStorage.getItem('username');
  return (
    <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/api/login' component={LoginForm} />
          <Route path='/api/logout' component={Logout} />
          <Route path={`/api/users/${x}/edit`} component={Edit} />
          <Route path='/api/form' component={LeaveForm} />
          <Route path='/api/register' component={Register} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
