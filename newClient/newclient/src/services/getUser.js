import axios from 'axios';

const getUser = () => {
  const n = localStorage.getItem('username');
  const url = `http://localhost:8080/api/user/${n}/info/`;
  return axios.get(url).then(response => {
    console.log('response', response);
    return response.data;
  });
};

export default getUser;
