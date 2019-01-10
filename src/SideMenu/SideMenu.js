import React from 'react';
import { Menu, Icon, Button } from 'antd';
import './SideMenu.css';
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  render() {
    return (
      <React.Fragment>
      <div
        style={{ 
          marginTop: 50 
        }}
      >
        <Menu
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          // theme="dark"
          inlineCollapsed={this.props.collapsed}
        >
          <Menu.Item key="1">
            <Link to="/materials">
            <Icon type="paper-clip" />
            <span>Materials</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/payments">
            <Icon type="credit-card" />
            <span>Payments</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/news">
            <Icon type="global" />
            <span>News</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/appointments">
            <Icon type="calendar" />
            <span>Appointment</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="btp">
            <Icon type="code" />
            <span>Btp Enrollment</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="ta">
            <Icon type="team" />
            <span>TAship</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Icon type="rise" />
            <span>Career Center</span>
          </Menu.Item>
          <Menu.Item key="8">
            <Icon type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </div>
      </React.Fragment>
    );
  }
}

export default SideMenu;
