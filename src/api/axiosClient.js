import axios from 'axios';
import queryString from 'query-string';
import apiConfig from './apiConfig';

//https://api.themoviedb.org/3/movie/popular?api_key=f2db6f4bb7de9fb016be7720040c6c2a&page=1
const axiosClient = axios.create({
  baseURL:  apiConfig.baseUrl ,
  headers: {
    'Content-Type': 'application/json',
  },
  params:{
    // params:params,
    api_key: apiConfig.apiKey

  },

//  paramsSerializer: (params ) =>  queryString.stringify({ ...params, api_key: apiConfig.apiKey }) ,
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
