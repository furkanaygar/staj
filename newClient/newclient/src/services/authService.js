import axios from 'axios';
import { setAuthorizationToken } from '../helpers/setAuthorizationToken';

const login = (username, password) => {
  const authData = { username, password };
  const url = 'http://localhost:3000/api/login';
  return axios
    .post(url, authData)
    .then(user => {
      const { token } = user.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      console.log('girdi');

      return user.data;
    })
    .catch(err => console.log(err));
};

export default { login };
