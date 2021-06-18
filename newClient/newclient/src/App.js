import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Edit from './components/Edit';
import NavigationBar from './components/NavigationBar';
import Logout from './components/Logout';
import LeaveForm from './components/LeaveForm';
import Register from './components/Register';
import AdminLoginForm from './components/AdminLoginForm';
import Get from './components/Get';
import AllUsers from './components/AllUsers';
const App = props => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/api/login' component={LoginForm} />
          <Route path='/api/logout' component={Logout} />
          <Route path='/api/user/edit' component={Edit} />
          <Route path='/api/form' component={LeaveForm} />
          <Route path='/api/register' component={Register} />
          <Route path='/api/admin/login' component={AdminLoginForm} />
          <Route path='/api/user' component={Get} />
          <Route path='/api/showall' component={AllUsers} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
