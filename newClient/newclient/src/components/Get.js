import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Get extends Component {
  state = {
    username: '',
    dateBirth: '',
    identificationNo: ''
  };
  // Çalışma Sıralaması 1. constructor 2. componentWillMount 3. render 4. componentDidMount
  componentWillMount() {
    const n = localStorage.getItem('username');
    const url = `http://localhost:8080/api/user/${n}/info`;
    axios.get(url).then(response => {
      this.setState({
        username: response.data.username,
        dateBirth: response.data.dateBirth,
        identificationNo: response.data.identificationNo
      });
    });
  }

  render() {
    const { isAuthenticated } = this.props;
    console.log('isAuthenticated,', isAuthenticated);
    if (!isAuthenticated) this.props.history.push('/');
    const { username, dateBirth, identificationNo } = this.state;
    return (
      <div>
        Username: {username}
        <br></br>
        Birth Date: {dateBirth}
        <br></br>
        Identification No: {identificationNo}
        <br></br>
        <Link
          to={{
            pathname: `/api/forms/${username}`,
            state: username
          }}
        >
          Show {username}'s All Forms
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { isAuthenticated, error, errorMessage, user, isAdmin } = state.auth;
  return {
    isAuthenticated,
    error,
    errorMessage,
    user,
    isAdmin
  };
};

export default connect(mapStateToProps)(Get);
