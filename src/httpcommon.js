import axios from "axios";


export default axios.create({
  baseURL: `https://sarthakbhan.pythonanywhere.com`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})