import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';
import { Redirect } from 'react-router-dom';

const login = (username, password) => {
  return axios
    .post('http://localhost:8080/api/login', { username, password })
    .then(response => {
      const token = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      setAuthorizationToken(token);
      return response.data;
    })
    .catch(err => console.log(err));
};
const control = username => {
  return axios
    .post('http://localhost:8080/api/login/control', { username })
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
};
const adminlogin = (username, password) => {
  return axios
    .post('http://localhost:8080/api/login', { username, password })
    .then(response => {
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

export default { control, login, logout, adminlogin };
