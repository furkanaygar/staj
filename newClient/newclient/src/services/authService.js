import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';
import { Redirect } from 'react-router-dom';

const login = (username, password) => {
  return axios
    .post('http://localhost:8080/api/login', { username, password })
    .then(response => {
      console.log('response', response);
      const token = response.data;
      console.log('token', token);
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setAuthorizationToken(token);

      return response.data;
    })
    .catch(err => console.log(err));
};
const adminlogin = (username, password) => {
  return axios
    .post('http://localhost:8080/api/login', { username, password })
    .then(response => {
      console.log('response', response);
      const token = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setAuthorizationToken(token);
      return response.data;
    })
    .catch(err => console.log(err));
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setAuthorizationToken(false);
  return <Redirect to='/'></Redirect>;
};

export default { login, logout, adminlogin };
