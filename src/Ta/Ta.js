import React from 'react';
import connect from '../apiClient';
import { Modal, Input, Row, Col, Card, Button } from 'antd';
import { getTa, postNewTa } from '../service';
import get from 'lodash/get';

class Ta extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const boolRefreshing = get(nextProps, 'taData.refreshing', false);
    if (boolRefreshing !== prevState.loading) {
      if (!boolRefreshing) {
        const success = get(nextProps, 'taData.value', false);
        const error = get(nextProps, 'taData.rejected', false);
        if (success) {
          return {
            loading: false,
            taData: get(nextProps, 'taData.value', [])
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
            taData: get(nextProps, 'responseObj.value', [])
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
      visible: false,
      taData: []
    }
  }
  paintTa = () => {
    return (
      <Row gutter={16}>
        {
          this.state.taData.map((value, index) => (
            <Col sm={8} key={index}>
              <Card className="dashb-card" title={value.Course} bordered={false}>
                Description: {value.description} <br />
                maxGroupSize: {value.maxTa} <br />
                faculty: {value.faculty && value.faculty.name} <br />
                department: {value.faculty && value.faculty.department} <br />
              </Card>
            </Col>
          ))
        }
      </Row>
    );
  }
  paintAddTa = () => {
    if (localStorage.getItem('type') === 'F') {
      return <Button onClick={() => { this.toggleModalState(true) }}>Add TA Application</Button>
    } else {
      return null;
    }
  }
  handleOk = () => {
    this.toggleModalState(false);
    const body = {};
    body.Course = this.state.newCourse;
    body.description = this.state.newDescription;
    body.maxTa = this.state.newSize;
    body.faculty = this.props.profile._id;
    console.log('body', body);
    this.props.addTa(body);
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
        {this.paintAddTa()}
        {this.paintTa()}
        <Modal
          title="Add Ta"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            onChange={(e) => { this.setState({ newCourse: e.target.value }) }}
            placeholder='Course'
          />
          <Input
            onChange={(e) => { this.setState({ newDescription: e.target.value }) }}
            placeholder='Description'
          />
          <Input
            onChange={(e) => { this.setState({ newSize: e.target.value }) }}
            placeholder='maxTa'
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(() => ({
  taData: getTa(),
  addTa: body => ({
    responseObj: postNewTa(body)
  })
}))(Ta);