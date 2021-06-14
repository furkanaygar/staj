import axios from 'axios';
const editBirth = (birth_date, identification_no) => {
  const x = localStorage.getItem('username');
  const url = `http://localhost:8080/api/users/${x}/edit`;
  return axios
    .put(url, { birth_date: birth_date, identification_no: identification_no })
    .then(response => {
      console.log('response', response);
    });
};

export default editBirth;
