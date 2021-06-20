import React, { Component } from 'react';
import axios from 'axios';

class Get extends Component {
  state = {
    username: '',
    dateBirth: '',
    identificationNo: '',
    reason: 'The user does not have a leave form.'
  };
  // Çalışma Sıralaması 1. constructor 2. componentWillMount 3. render 4. componentDidMount
  componentWillMount() {
    const n = localStorage.getItem('username');
    const url = `http://localhost:8080/api/user/${n}/info`;
    axios.get(url).then(response => {
      this.setState({
        username: response.data.username,
        dateBirth: response.data.dateBirth,
        identificationNo: response.data.identificationNo,
        reason: response.data.reason
      });
    });
  }

  render() {
    const { username, dateBirth, identificationNo, reason } = this.state;
    return (
      <div>
        Username: {username}
        <br></br>
        Birt Date: {dateBirth}
        <br></br>
        Identification No:{identificationNo}
        <br></br>
        LeaveForm Reason:{reason}
      </div>
    );
  }
}

export default Get;
