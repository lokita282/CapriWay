import axios from "axios";


export default axios.create({
  //production url
  // baseURL: `https://sarthakbhan.pythonanywhere.com`,

  // development url
  baseURL: `https://3236-2405-201-6-41fd-cc08-8d1-df7e-6741.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})