import React from 'react';
import connect from '../apiClient';
import { getNews, postNewNews } from '../service';
import { Row, Col, Card, Button, Modal, Input } from 'antd';
import get from 'lodash/get';

class News extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const boolRefreshing = get(nextProps, 'newsData.refreshing', false);
    if (boolRefreshing !== prevState.loading) {
      if (!boolRefreshing) {
        const success = get(nextProps, 'newsData.value', false);
        const error = get(nextProps, 'newsData.rejected', false);
        if (success) {
          return {
            loading: false,
            newsData: get(nextProps, 'newsData.value', [])
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
            newsData: get(nextProps, 'responseObj.value', [])
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
      newsData: [],
      visible: false
    }
  }
  paintNews = () => {
    return (
      <Row gutter={16}>
        {
          this.state.newsData.map((value, index) => (
            <Col sm={8} key={index}>
              <Card className="dashb-card" title={value.heading} bordered={false}>
                {value.description}
              </Card>
            </Col>
          ))
        }
      </Row>
    );
  }
  paintAddNews = () => {
    if (localStorage.getItem('type') === 'F') {
      return <Button onClick={() => { this.toggleModalState(true) }}>Add News</Button>
    } else {
      return null;
    }
  }
  handleOk = () => {
    this.toggleModalState(false);
    const body = {};
    body.heading = this.state.newHeading;
    body.description = this.state.newDescription;
    console.log('body', body);
    this.props.addNews(body);
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
    return (
      <React.Fragment>
        {this.paintAddNews()}
        {this.paintNews()}
        <Modal
          title="Add News"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            onChange={(e) => { this.setState({ newHeading: e.target.value }) }}
            placeholder='Heading'
          />
          <Input
            onChange={(e) => { this.setState({ newDescription: e.target.value }) }}
            placeholder='Description'
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(() => ({
  newsData: getNews(),
  addNews: body => ({
    responseObj: postNewNews(body)
  })
}))(News);