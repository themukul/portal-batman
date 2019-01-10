import React from 'react';
import { Input, Icon, Button, Card } from 'antd';
import connect from '../apiClient';
import { loginStudent, loginFaculty } from '../service';
import get from 'lodash/get';
import { Redirect } from 'react-router-dom';
import { Radio } from 'antd';
import './Login.css'
import img from './logo.png';

const RadioGroup = Radio.Group;

class Login extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const boolRefreshing = get(nextProps, 'loginStResponseObj.refreshing', false) || get(nextProps, 'loginFacResponseObj.refreshing', false);
    if (!boolRefreshing) {
      const success = get(nextProps, 'loginStResponseObj.value', false) || get(nextProps, 'loginFacResponseObj.value', false);
      const error = get(nextProps, 'loginStResponseObj.rejected', false) || get(nextProps, 'loginFacResponseObj.rejected', false);
      if (success) {
        if (prevState.type === 'Student') {
          localStorage.setItem('token', nextProps.loginStResponseObj.value.token);
          localStorage.setItem('type', 'S');
        } else {
          localStorage.setItem('token', nextProps.loginFacResponseObj.value.token);
          localStorage.setItem('type', 'F');
        }
        return {
          loading: false,
          isLoggedIn: true
        }
      }
      if (error) {
        return {
          loading: false,
          isLoggedIn: false
        }
      }
      return null;
    } else {
      return {
        loading: true,
        isLoggedIn: false
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      isLoggedIn: false,
      type: 'Student'
    }
  }
  handleEmailInput = (e) => {
    this.setState({
      email: e.target.value
    });
  }
  handlePasswordInput = (e) => {
    this.setState({
      password: e.target.value
    });
  }
  handelLogin = () => {
    const body = {
      email: this.state.email,
      password: this.state.password
    };
    this.state.type === 'Student' ? this.props.studentLogin(body) : this.props.facultyLogin(body);
  }
  onTypeChange = (e) => {
    this.setState({
      type: e.target.value
    });
  }
  render() {
    if (this.state.isLoggedIn || localStorage.getItem('token')) {
      return <Redirect to='/dashboard' />
    } 
    return (
      <div>
        <Card className="login-card">
        <img src={img} alt="" />
        <br />
          <br />  
          <Input
            onChange={this.handleEmailInput}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />
          <br />
          <br />
          <Input
            onChange={this.handlePasswordInput}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
          <br />
          <br />
          <RadioGroup onChange={this.onTypeChange} value={this.state.type}>
            <Radio value={'Student'}>Student</Radio>
            <Radio value={'Faculty'}>Faculty</Radio>
          </RadioGroup>
          <br />
          <br />
          <Button
            onClick={this.handelLogin}
            loading={this.state.loading}
          >
            Login
          </Button>
        </Card>
      </div>
    );
  }
}

export default connect(() => ({
  studentLogin: body => ({
    loginStResponseObj: loginStudent(body)
  }),
  facultyLogin: body => ({
    loginFacResponseObj: loginFaculty(body)
  })
}))(Login);