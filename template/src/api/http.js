import axios from 'axios';
import Cookie from 'js-cookie';
import { router } from '../router';

const ajax = axios.create({
  baseURL: `/${process.env.APP}-api/`,
  timeout: 5000
});

// http request 拦截器
let userSession = Cookie.get('user_session');
ajax.interceptors.request.use(
  config => {
    if (userSession) {
      config.headers.Authorization = `Bearer ${userSession}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
ajax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 403:
          router.replace({
            path: '/403'
          });
          break;
        case 500:
          router.replace({
            path: '/500'
          });
          break;
        case 504:
          router.replace({
            path: '/500'
          });
          break;
        default:
          /* iView.Notice.error({title: '请求错误', desc: error.response.data.message}) */
      }
    }
    console.log(error)
    return Promise.reject(error.response.data)
  });

export default ajax;
