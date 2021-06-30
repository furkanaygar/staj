import axios from 'axios';

const register = (username, password, birth_date, identification_no) => {
  return axios
    .post('http://localhost:8080/api/register', {
      username,
      password,
      birth_date,
      identification_no
    })
    .then(response => {
      return response.data.test;
    })
    .catch(err => console.log(err));
};
const addUserAdmin = (
  username,
  password,
  birth_date,
  identification_no,
  role
) => {
  return axios
    .post('http://localhost:8080/api/admin/add', {
      username,
      password,
      birth_date,
      identification_no,
      role
    })
    .then(response => {
      return response.data.test;
    })
    .catch(err => console.log(err));
};
export default { register, addUserAdmin };
