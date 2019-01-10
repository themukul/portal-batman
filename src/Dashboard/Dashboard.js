import React from 'react';
import SideMenu from '../SideMenu/SideMenu';
import { Card } from 'antd';
import { Row, Col, Button, Icon } from 'antd';
import './Dashboard.css';
import img from './logo.png';
import { Redirect } from 'react-router-dom';
import connect from '../apiClient';
import { getStudent, getFaculty } from '../service';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import Materials from '../Materials/Materials';
import Payments from '../Payments/Payments';
import News from '../News/News';
import Btp from '../Btp/Btp';
import Ta from '../Ta/Ta';

class Dashboard extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const boolRefreshing = get(nextProps, 'profileData.refreshing', false);
    if (!boolRefreshing) {
      const success = get(nextProps, 'profileData.value', false);
      const error = get(nextProps, 'profileData.rejected', false);
      if (success) {
        return {
          loading: false,
          profileData: get(nextProps, 'profileData.value', {})
        }
      }
      if (error) {
        return {
          loading: false,
          profileData: {}
        }
      }
      return null;
    } else {
      return {
        loading: true,
        profileData: {}
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      loading: false,
      profileData: {}
    }
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  renderTopBar = () => {
    return (
      <div className="top-bar">
        <img src={img} alt="" className="logo-image" />
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          // style={{ marginBottom: 16 }}
        >
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
      </div>
    );
  }
  handleDashboardPaint = () => {
    if (this.props.match.path === "/dashboard") { 
      return this.renderCards();
    } else {
      return this.renderComponent(this.props.match.path);
    }
  }
  renderCards = () => (
    <Row gutter={16}>
      <Col sm={8}>
        <Link to="/materials"><Card className="dashb-card" title="Materials" bordered={false}>A list of materials for various courses</Card></Link>
      </Col>
      <Col sm={8}>
        <Link to="/payments"><Card className="dashb-card" title="Payments" bordered={false}>Payments overdue</Card></Link>
      </Col>
      <Col sm={8}>
        <Link to="/news"><Card className="dashb-card" title="News" bordered={false}>Check out news portal</Card></Link>
      </Col>
      <Col sm={8}>
        <Link to="/appontments"><Card className="dashb-card" title="Appointment" bordered={false}>Set up an appointment with faculty</Card></Link>
      </Col>
      <Col sm={8}>
        <Link to="/btp"><Card className="dashb-card" title="Btp" bordered={false}>Enroll for a BTP under a faculty</Card></Link>
      </Col>
      <Col sm={8}>
        <Link to="/ta"><Card className="dashb-card" title="TAship" bordered={false}>Apply for TAship at LNMIIT</Card></Link>
      </Col>
      <Col sm={8}>
        <a href="https://placements.lnmiit.ac.in/" target="_blank"><Card className="dashb-card" title="Career Center" bordered={false}>Chekout our placement portal</Card></a>
      </Col>
    </Row>
  );
  renderComponent = (path) => {
    if (path === "/materials") {
      return <Materials profile={this.state.profileData} />
    } else if (path === "/payments") {
      return <Payments profile={this.state.profileData} />
    } else if (path === "/news") {
      return <News profile={this.state.profileData} />
    } else if (path === "/btp") {
      return <Btp profile={this.state.profileData} />
    } else if (path === "/ta") {
      return <Ta profile={this.state.profileData} />
    }
  }
  render() {
    console.log('state', this.match);
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />
    }
    return (
      <div>
        {this.renderTopBar()}
        <Row>
          <Col sm={3}>
            <SideMenu collapsed={this.state.collapsed} />
          </Col>
          <Col sm={21}>
            <div className="dashboard-right-panel">
              {
                this.handleDashboardPaint()
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(() => {
  const userType = localStorage.getItem("type");
  if (userType === 'S') {
    return {
      profileData: getStudent()
    }
  } else {
    return {
      profileData: getFaculty()
    }
  }
})(Dashboard);