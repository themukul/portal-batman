import { connect } from 'react-refetch';
import qs from 'qs';

// Utils
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const REQUEST_TYPES = ['GET', 'PUT', 'POST', 'DELETE'];
const NOT_SUPPORT_BODY_METHOD = ['GET'];

/*
 * Common API Client Handler
 */
export default connect.defaults({
  force: true,
  refreshing: true,
  buildRequest: mapping => {
    const { body, url, method } = mapping;
    const options = {
      method,
      headers: mapping.headers || {},
      credentials: mapping.credentials,
      redirect: mapping.redirect,
      mode: mapping.mode,
      body: !isEmpty(body) ? JSON.stringify(body) : body
    };

    if (method && REQUEST_TYPES.indexOf(method) === -1) {
      return new Error('REQUEST METHOD INVALID');
    }

    if (!url) {
      return new Error('API URL NOT PRESENT');
    }

    let newUrl = mapping.url;

    if (!isEmpty(body) && NOT_SUPPORT_BODY_METHOD.indexOf(method) !== -1) {
      newUrl += qs.stringify(body, {
        addQueryPrefix: true,
        allowDots: true,
        arrayFormat: 'repeat'
      });
      delete options.body;
    }

    // Get user cookie
    const userToken = localStorage.getItem('token');
    if (userToken) options.headers.Authorization = `${userToken}`;

    return new Request(newUrl, options);
  },

  handleResponse: response =>
    new Promise((resolve, reject) => {
      try {
        return response
          .json()
          .then(data => {
            if (response.status >= 200 && response.status < 300) {
              const successData = get(data, 'success.data', null);
              return resolve(successData || data);
            }
            return reject(data);
          })
          .catch(e => {
            return reject(e);
          });
      } catch (error) {
        return reject(error);
      }
    })
});