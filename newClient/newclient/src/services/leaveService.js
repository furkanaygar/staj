import axios from 'axios';
const leave = (username, date, count, reason, type) => {
  const url = `http://localhost:8080/api/form`;
  return axios
    .post(url, {
      username,
      date,
      count,
      reason,type
    })
    .then(response => {
      console.log('response', response);
    });
};

export default leave;
