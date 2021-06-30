import axios from 'axios';
const leave = (username, date, count, reason, type, duration) => {
  const url = `http://localhost:8080/api/form`;
  return axios
    .post(url, {
      username,
      date,
      count,
      reason,
      type,
      duration
    })
    .catch(err => console.log(err));
};

export default leave;
