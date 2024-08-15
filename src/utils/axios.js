import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/ecomm/api/v1/', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,

});


export default axiosInstance;
