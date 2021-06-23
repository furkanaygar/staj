import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AllUsers extends Component {
  state = {
    posts: []
  };
  // Çalışma Sıralaması 1. constructor 2. componentWillMount 3. render 4. componentDidMount
  componentWillMount() {
    let currentComponent = this;
    axios.get(`http://localhost:8080/api/user/showall`).then(response => {
      currentComponent.setState({
        posts: response.data
      });
    });
  }
  handleClick(username) {
    localStorage.setItem('request', username);
  }

  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) this.props.history.push('/');
    const renderItems = this.state.posts.map((item, i) => {
      // BUTONLU BASTIRMAYI DENEYEBİLİRSİN
      return (
        <ul>
          <li key={i}>
            <div>
              Username: {item.username}
              <br></br>
              Birth Date: {item.dateBirth}
              <br></br>
              Identification No: {item.identificationNo}
              <br></br>
              <Link
                to={{
                  pathname: `/api/forms/${item.username}`,
                  state: item.username 
                }}
              >
                Show {item.username}'s All Forms
              </Link>
            </div>
          </li>
        </ul>
      );
    });
    return <ul>{renderItems}</ul>;
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
