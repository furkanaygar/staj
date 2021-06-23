import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class GetForms extends Component {
  state = {
    posts: [],
    control: ''
  };
  componentWillMount() {
    const { state } = this.props.location;
    axios.get(`http://localhost:8080/api/forms/${state}`).then(response => {
      this.setState({
        posts: response.data
      });
    });
  }

  render() {
    const renderItems = this.state.posts.map((item, i) => {
      console.log('start', item.username);
      return (
        <ul>
          <li key={i}>
            <div>
              Username:{item.username}
              <br></br>
              LeaveForm Start Date:{item.startDate}
              <br></br>
              LeaveForm Finish Date:{item.finishDate}
              <br></br>
              Leave Form Reason:{item.reason}
              <br></br>
              Leave Form Type:{item.type}
            </div>
          </li>
        </ul>
      );
    });
    if (this.state.posts.length > 0) {
      return <ul>{renderItems}</ul>;
    } else return <h3>The user does not have any forms.</h3>;
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
