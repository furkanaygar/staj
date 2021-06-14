import axios from 'axios';
const getUser = () => {
  const x = localStorage.getItem('username');
  const url = `http://localhost:8080/api/users/${x}`;
  return axios.get(url).then(response => {
    console.log('response', response);
    return response;
  });
};

export default getUser;
