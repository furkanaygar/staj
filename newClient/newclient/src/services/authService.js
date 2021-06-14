import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';

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

const logout = () => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
};

export default { login, logout };
