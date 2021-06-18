import axios from 'axios';
const editBirth = (username, birth_date, identification_no) => {
  const a = localStorage.getItem('username');
  const url = `http://localhost:8080/api/user/${a}/edit`;
  return axios
    .put(url, {
      username,
      birth_date,
      identification_no
    })
    .then(response => {
      console.log('response', response);
    });
};

export default editBirth;
