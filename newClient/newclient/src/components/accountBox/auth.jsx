import { render } from '@testing-library/react';
import axios from 'axios';
import { TokenContainer } from './common';

export const auth = (email, password) => {
  return fetch => {
    const url = 'http://localhost:3000/api/login';
    const authData = { username: 'metehan.danaci', password: 'mete' };
    axios.post(url, authData).then(response => {
      console.log(response.data);
    });
  };
};
