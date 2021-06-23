import axios from 'axios';
const getForm = () => {
  return axios
    .get(`http://localhost:8080/api/forms/${this.props.item.username}}`)
    .then(response => {
      console.log('response', response);

      return response.data;
    })
    .catch(err => console.log(err));
};
export default { getForm };
