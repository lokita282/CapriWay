import axios from "axios";


export default axios.create({
  //production url
  // baseURL: `https://sarthakbhan.pythonanywhere.com`,

  // development url
  baseURL: `https://3.6.47.71/`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})