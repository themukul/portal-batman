import React from 'react';
import connect from '../apiClient';
import { getBtp, postNewBtp } from '../service';
import { Modal, Input, Row, Col, Card, Button } from 'antd';
import get from 'lodash/get';

class Btp extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const boolRefreshing = get(nextProps, 'btpData.refreshing', false);
    if (boolRefreshing !== prevState.loading) {
      if (!boolRefreshing) {
        const success = get(nextProps, 'btpData.value', false);
        const error = get(nextProps, 'btpData.rejected', false);
        if (success) {
          return {
            loading: false,
            btpData: get(nextProps, 'btpData.value', [])
          }
        }
        if (error) {
          return {
            loading: false,
          }
        }
        return null;
      } else {
        return {
          loading: true,
        }
      }
    }

    const boolSubmitting = get(nextProps, 'responseObj.refreshing', false);
    if (boolSubmitting !== prevState.loading) {
      if (!boolSubmitting) {
        const success = get(nextProps, 'responseObj.value', false);
        const error = get(nextProps, 'responseObj.rejected', false);
        if (success) {
          return {
            loading: false,
            btpData: get(nextProps, 'responseObj.value', [])
          }
        }
        if (error) {
          return {
            loading: false,
          }
        }
        return null;
      } else {
        return {
          loading: true,
        }
      }
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      btpData: [],
      visible: false
    }
  }
  paintBtp = () => {
    return (
      <Row gutter={16}>
        {
          this.state.btpData.map((value, index) => (
            <Col sm={8} key={index}>
              <Card className="dashb-card" title={value.name} bordered={false}>
                Description: {value.description} <br />
                maxGroupSize: {value.maxGroupSize} <br />
                faculty: {value.faculty && value.faculty.name} <br />
                department: {value.faculty && value.faculty.department} <br />
              </Card>
            </Col>
          ))
        }
      </Row>
    );
  }
  paintAddBtp = () => {
    if (localStorage.getItem('type') === 'F') {
      return <Button onClick={() => { this.toggleModalState(true) }}>Add Material</Button>
    } else {
      return null;
    }
  }
  handleOk = () => {
    this.toggleModalState(false);
    const body = {};
    body.name = this.state.newName;
    body.description = this.state.newDescription;
    body.maxGroupSize = this.state.newSize;
    body.faculty = this.props.profile._id;
    console.log('body', body);
    this.props.addBtp(body);
  }
  handleCancel = () => {
    this.toggleModalState(false);
  }
  toggleModalState = (bool) => {
    this.setState({
      visible: bool
    });
  }
  render() {
    return(
      <React.Fragment>
        {this.paintAddBtp()}
        {this.paintBtp()}
        <Modal
          title="Add Btp"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            onChange={(e) => { this.setState({ newName: e.target.value }) }}
            placeholder='Name'
          />
          <Input
            onChange={(e) => { this.setState({ newDescription: e.target.value }) }}
            placeholder='Description'
          />
          <Input
            onChange={(e) => { this.setState({ newSize: e.target.value }) }}
            placeholder='maxGroupSize'
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(() => ({
  btpData: getBtp(),
  addBtp: body => ({
    responseObj: postNewBtp(body)
  })
}))(Btp);
