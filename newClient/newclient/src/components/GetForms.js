import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './GetForms.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import './Get.css';
import { BiSearch } from 'react-icons/bi';

class GetForms extends Component {
  state = {
    posts: [],
    searchItem: '',
    test: 0
  };
  componentWillMount() {
    const { state } = this.props.location;
    if (this.state.searchItem === '') {
      axios
        .get(`http://localhost:8080/api/forms/${state}`)
        .then(response => {
          this.setState({
            posts: response.data
          });
        })
        .catch(err => console.log(err));
    }
  }
  handleApprove(id) {
    const { state } = this.props.location;
    console.log('us', state, 'id', id);
    axios
      .post(`http://localhost:8080/api/user/form/${state}/approve/${id}`)
      .then(response => {
        console.log('res');
        this.setState({ posts: response.data });
      })
      .catch(err => console.log(err));
  }
  handleReject(id) {
    console.log('reject');
    const { state } = this.props.location;
    console.log('us', state, 'id', id);
    axios
      .post(`http://localhost:8080/api/user/form/${state}/reject/${id}`)
      .then(response => {
        console.log('res');
        this.setState({ posts: response.data });
      })
      .catch(err => console.log(err));
  }
  handleCancel = () => {};

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    if (this.state.searchItem !== '') {
      axios
        .post(`http://localhost:8080/api/user/search`, {
          date: this.state.searchItem
        })
        .then(response => {
          this.setState({
            posts: response.data,
            test: 1,
            searchItem: ''
          });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { state } = this.props.location;
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) this.props.history.push('/');
    const renderItems = this.state.posts.map((item, i) => {
      return (
        <ul>
          <li key={i}>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.startDate}</td>
                    <td>{item.finishDate}</td>
                    <td>{item.type}</td>
                    <td>{item.duration}</td>
                    <td>{item.status}</td>
                    <td>{item.reason}</td>
                    <td>
                      {item.status === 'Beklemede' && !this.props.isAdmin ? (
                        <h4> Form değerlendirilmek üzere beklemede.</h4>
                      ) : null}
                      {item.status === 'Onaylandı' &&
                      item.status !== 'Beklemede' &&
                      item.status !== 'Reddedildi' ? (
                        <h4> Form onaylandı.</h4>
                      ) : null}
                      {item.status === 'Reddedildi' &&
                      item.status !== 'Beklemede' &&
                      item.status !== 'Onaylandı' ? (
                        <h4> Form reddedildi.</h4>
                      ) : null}
                      {item.status === 'Beklemede' && this.props.isAdmin ? (
                        <Popconfirm
                          title='Formu onaylamak istiyor musunuz ?'
                          okText='Evet'
                          cancelText='Hayır'
                          placement='right'
                          icon={
                            <QuestionCircleOutlined style={{ color: 'red' }} />
                          }
                          onConfirm={event => this.handleApprove(item.id)}
                          onCancel={this.handleCancel}
                        >
                          <a href='#'>Onayla </a>
                        </Popconfirm>
                      ) : null}
                      {item.status === 'Beklemede' && this.props.isAdmin ? (
                        <Popconfirm
                          title='Formu reddetmek istiyor musunuz?'
                          okText='Evet'
                          cancelText='Hayır'
                          placement='right'
                          icon={
                            <QuestionCircleOutlined style={{ color: 'red' }} />
                          }
                          onConfirm={event => this.handleReject(item.id)}
                          onCancel={this.handleCancel}
                        >
                          <a href='#'>Reddet </a>
                        </Popconfirm>
                      ) : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      );
    });
    if (this.state.posts.length > 0) {
      return (
        <ul>
          <input
            type='text'
            placeholder='Başlangıç Tarihine Göre Ara... YY-AA-DD  '
            onChange={this.handleChange}
            className='search'
            name='searchItem'
          />
          <BiSearch className='searchbutton' onClick={this.handleClick}>
            {' '}
          </BiSearch>{' '}
          <h3 style={{ textAlign: 'center' }}>{state}'nın İzin Formları</h3>
          <table>
            <thead>
              <tr>
                <th># </th>
                <th>Kullanıcı Adı</th>
                <th>İzin Formunun Başlangıç Tarihi</th>
                <th>İzin Formunun Bitiş Tarihi</th>
                <th>İzin Formunun Türü</th>
                <th>İzin Formunun Süresi</th>
                <th>İzin Formunun Durumu</th>
                <th>İzin Açıklaması</th>
                {this.props.isAdmin ? <th>İşlemler</th> : <th>Yorum</th>}
              </tr>
            </thead>
          </table>
          {renderItems}
        </ul>
      );
    }
    if (this.state.test > 0 && this.state.posts.length === 0) {
      return (
        <div>
          <h3>
            Kullanıcı aradığınız tarihten sonra başlayacak bir izin formuna
            sahip değildir.
          </h3>
        </div>
      );
    } else return <h3>Kullanıcının herhangi bir formu bulunmamaktadır.</h3>;
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

export default connect(mapStateToProps)(GetForms);
