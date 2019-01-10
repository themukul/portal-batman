import React from 'react';
import connect from '../apiClient';
import { getMaterials, postNewMaterial } from '../service';
import get from 'lodash/get';
import { Table, Button, Modal, Input } from 'antd';

class Materials extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const boolRefreshing = get(nextProps, 'materialsData.refreshing', false);
    if (boolRefreshing !== prevState.loading) {
      if (!boolRefreshing) {
        const success = get(nextProps, 'materialsData.value', false);
        const error = get(nextProps, 'materialsData.rejected', false);
        if (success) {
          return {
            loading: false,
            materialsData: get(nextProps, 'materialsData.value', [])
          }
        }
        if (error) {
          return {
            loading: false,
            materialsData: []
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
            materialsData: get(nextProps, 'responseObj.value', [])
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
      materialsData: [],
      visible: false
    }
  }
  paintMaterialsTable = () => {
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
        title: 'Uploaded by',
        dataIndex: 'uploaded_by',
        key: 'uploaded_by',
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
      }
    ];
    let dataSource = [];
    dataSource = this.state.materialsData.map((value, index) => {
      return {
        ...value,
        uploaded_by: value.uploaded_by.name,
        key: index
      }
    });
    return <Table dataSource={dataSource} columns={columns} />
  }
  toggleModalState = (bool) => {
    this.setState({
      visible: bool
    });
  }
  paintAddMaterial = () => {
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
    body.uploaded_by = this.props.profile._id;
    body.department = this.state.newDepartment;
    body.url = this.state.newUrl;
    console.log('body', body);
    this.props.addMaterial(body);
  }
  handleCancel = () => {
    this.toggleModalState(false);
  }
  render() {
    return (
      <React.Fragment>
        {this.paintAddMaterial()}
        {this.paintMaterialsTable()}
        <Modal
          title="Add material"
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
            onChange={(e) => { this.setState({ newDepartment: e.target.value }) }}
            placeholder='Department'
          />
          <Input
            onChange={(e) => { this.setState({ newUrl: e.target.value }) }}
            placeholder='URL'
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(() => ({
  materialsData: getMaterials(),
  refreshMaterials: () => ({
    materialsData: getMaterials()
  }),
  addMaterial: body => ({
    responseObj: postNewMaterial(body)
  })
}))(Materials);