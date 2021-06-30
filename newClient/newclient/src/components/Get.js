import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Get.css';
import { Button } from 'antd';
class Get extends Component {
  state = {
    username: '',
    dateBirth: '',
    identificationNo: '',
    status: '',
    role: ''
  };
  // Çalışma Sıralaması 1. constructor 2. componentWillMount 3. render 4. componentDidMount
  componentWillMount() {
    const n = localStorage.getItem('username');
    const url = `http://localhost:8080/api/user/${n}/info`;
    axios
      .get(url)
      .then(response => {
        console.log('RESPONSE', response);
        this.setState({
          username: response.data.username,
          dateBirth: response.data.dateBirth,
          identificationNo: response.data.identificationNo
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) this.props.history.push('/');
    const { username, dateBirth, identificationNo } = this.state;
    return (
      <div>
        <h3 style={{ textAlign: 'center', marginTop: '3px' }}>
          {username} Kullanıcı Bilgisi
        </h3>
        <table className='tableGet' style={{ alignItems: 'center' }}>
          <thead>
            <tr>
              <th>Kullanıcı Adı</th>
              <td>{username}</td>
            </tr>
            <tr>
              <th>Doğum Tarİhİ</th>
              <td>{dateBirth}</td>
            </tr>
            <tr>
              <th>TC Kİmlİk Numarası</th>
              <td>{identificationNo}</td>
            </tr>
            <tr>
              <th>İzİn Formları</th>
              <td>
                <Link
                  to={{
                    pathname: `/api/forms/${username}`,
                    state: username
                  }}
                >
                  {username}'nın Tüm İzin Formları Göster
                </Link>
              </td>
            </tr>
          </thead>
        </table>
        <Button style={{ marginLeft: '45%', marginTop: ' 8px' }} type='primary'>
          <Link to='/api/user/edit'>Kullanıcıyı Düzenle</Link>
        </Button>
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
