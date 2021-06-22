import axios from 'axios';
const editBirth = (username, birth_date, identification_no) => {
  const url = 'http://localhost:8080/api/user/edit';
  return axios.put(url, { username, birth_date, identification_no });
};

export default editBirth;
