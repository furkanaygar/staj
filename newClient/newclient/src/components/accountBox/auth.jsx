import axios from 'axios';

export const Auth = () => {
  return () => {
    const url = 'http://localhost:3000/api/login';
    const authData = { username: 'metehan.danaci', password: 'mete' };
    axios.post(url, authData).then(response => {
      console.log(response.data);
      //console.log(response);
      localStorage.setItem('token', response.data);
    });
  };
};
export const getU = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const url1 = 'http://localhost:3000/api/users/tan.apaydin';
    axios.post(url1).then(response => {
      console.log(response.data);
      //console.log(response);
      localStorage.setItem('token', response.data);
    });
  };
};

export const headerWithToken = token => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
});
