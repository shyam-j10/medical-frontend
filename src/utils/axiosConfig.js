import axios from "axios"
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_MEDICALBEURL,
  });

axiosInstance.interceptors.request.use(request => {
    const accessToken = localStorage.getItem('medicalToken');
    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  }, error => {
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(

    async response => {
          let originalRequest = response.config;
          console.log(response,"////// res")
      if (response.data.code === 201) {
        console.log("2011111111")
        console.log(response.data,"///////////")
          localStorage.setItem('medicalToken', response.data.token);   
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;          console.log(originalRequest.headers)
          return axiosInstance(originalRequest); 
      }else{
        return response
      }
    }

  );

export default axiosInstance

