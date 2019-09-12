import axios from 'axios';

export const customAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {

      'Content-Type': 'application/json',
      Authorization: `${token}`
    },
    baseURL: ''
  });
};
