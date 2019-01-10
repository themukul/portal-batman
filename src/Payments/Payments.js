import React from 'react';
import connect from '../apiClient';
import { getPayments, postNewPayment } from '../service';
import { Table, Modal, Input, Button } from 'antd';
import get from 'lodash/get';

class Payments extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const boolRefreshing = get(nextProps, 'paymentsData.refreshing', false);
    if (boolRefreshing !== prevState.loading) {
      if (!boolRefreshing) {
        const success = get(nextProps, 'paymentsData.value', false);
        const error = get(nextProps, 'paymentsData.rejected', false);
        if (success) {
          return {
            loading: false,
            paymentsData: get(nextProps, 'paymentsData.value', [])
          }
        }
        if (error) {
          return {
            loading: false,
            paymentsData: []
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
            paymentsData: get(nextProps, 'responseObj.value', [])
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
      paymentsData: [],
      visible:false
    }
  }
  paintTable = () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      }, 
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      }, 
      {
        title: 'Due date',
        dataIndex: 'due_date',
        key: 'due_date',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      }
    ];
    let dataSource = [];
    dataSource = this.state.paymentsData.map((value, index) => {
      return {
        ...value,
        key: index
      }
    });
    return <Table dataSource={dataSource} columns={columns} />
  }
  paintAddPayment = () => {
    if (localStorage.getItem('type') === 'F') {
      return <Button onClick={() => { this.toggleModalState(true) }}>Add Payment</Button>
    } else {
      return null;
    }
  }
  handleOk = () => {
    this.toggleModalState(false);
    const body = {};
    body.name = this.state.newName;
    body.description = this.state.newDescription;
    body.staus = this.state.newStatus;
    body.amount = this.state.newAmount;
    console.log('body', body);
    this.props.addPayment(body);
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
        {this.paintAddPayment()}
        { this.paintTable() }
        <Modal
          title="Add payment"
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
            onChange={(e) => { this.setState({ newStatus: e.target.value }) }}
            placeholder='Status'
          />
          <Input
            onChange={(e) => { this.setState({ newAmount: e.target.value }) }}
            placeholder='Amount'
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(() => ({
  paymentsData: getPayments(),
  addPayment: body => ({
    responseObj: postNewPayment(body)
  })
}))(Payments);