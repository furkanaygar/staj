const editBirth = birth => {
  const url = 'http://localhost:3000/api/edit';
  return axios.post(url, birth).catch(err => console.log(err));
};

export default { editBirth };
