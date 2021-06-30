import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import './Get.css';
import { BiSearch } from 'react-icons/bi';
class AllUsers extends Component {
  state = {
    posts: [],
    test: 0,
    searchItem: ''
  };
  // Çalışma Sıralaması 1. constructor 2. componentWillMount 3. render 4. componentDidMount
  componentWillMount() {
    axios
      .get(`http://localhost:8080/api/user/showall`)
      .then(response => {
        this.setState({
          posts: response.data
        });
      })
      .catch(err => console.log(err));
  }
  handleClick = e => {
    console.log('this.state.searchItem', this.state.searchItem);
    if (this.state.searchItem !== '') {
      axios
        .post(`http://localhost:8080/api/user/search/users`, {
          username: this.state.searchItem
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

  handleDelete(username) {
    axios
      .post(`http://localhost:8080/api/user/${username}/delete`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(err => console.log(err));
  }
  handleChange = e => {
    console.log('name', e.target.name, 'value', e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleActive(username) {
    console.log('active');

    axios
      .post(`http://localhost:8080/api/user/${username}/active`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(err => console.log(err));
  }
  handleCancel = () => {};
  render() {
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
                    <td>{item.username}</td>
                    <td>{item.dateBirth}</td>
                    <td>{item.identificationNo}</td>
                    <td>{item.roles[0].name}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/api/forms/${item.username}`,
                          state: item.username
                        }}
                      >
                        {item.username}'nın Tüm İzin Formlarını Göster
                      </Link>
                    </td>
                    <td>
                      {item.username !== localStorage.getItem('username') ? (
                        item.status === 'Aktif' ? (
                          <Popconfirm
                            title='Kullanıcıyı Silmek İstiyor Musunuz?'
                            okText='Evet'
                            cancelText='Hayır'
                            placement='right'
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: 'red' }}
                              />
                            }
                            onConfirm={event =>
                              this.handleDelete(item.username)
                            }
                            onCancel={this.handleCancel}
                          >
                            <a href='#'>Sil </a>
                          </Popconfirm>
                        ) : (
                          <Popconfirm
                            title='Kullanıcıyı Aktive Etmek İstiyor Musunuz ?'
                            okText='Evet'
                            cancelText='Hayır'
                            placement='right'
                            icon={
                              <QuestionCircleOutlined
                                style={{ color: 'red' }}
                              />
                            }
                            onConfirm={event =>
                              this.handleActive(item.username)
                            }
                            onCancel={this.handleCancel}
                          >
                            <a href='#'>Aktive Et </a>
                          </Popconfirm>
                        )
                      ) : (
                        <h4>Kendinize herhangi bir işlem yapamazsınız.</h4>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      );
    });
    if (this.state.posts.length === 0) {
      return (
        <div>
          <h3>Kullanıcı Bulunamadı.</h3>
        </div>
      );
    } else
      return (
        <ul>
          <h3 style={{ textAlign: 'center', marginTop: '3px' }}>
            Tüm Kullanıcılar
          </h3>
          <table>
            <thead>
              <tr>
                <th>Kullanıcı Adı</th>
                <th>Doğum Tarİhİ</th>
                <th>TC Kİmlİk Numarası</th>
                <th>Kullanıcının Türü</th>
                <th>Kullanıcının Durumu</th>
                <th>Formlar</th>
                <th>İşlemler</th>
              </tr>
            </thead>
          </table>
          <input
            type='text'
            placeholder='Kullanıcı Adı Ara...  '
            onChange={this.handleChange}
            className='search'
            name='searchItem'
          />
          <BiSearch className='searchbutton' onClick={this.handleClick}>
            {' '}
          </BiSearch>{' '}
          {renderItems}
        </ul>
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
export default connect(mapStateToProps)(AllUsers);
