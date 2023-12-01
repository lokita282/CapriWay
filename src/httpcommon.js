import axios from "axios";


export default axios.create({
  //production url
  // baseURL: `https://sarthakbhan.pythonanywhere.com`,

  // development url
  baseURL: `https://649a-2405-201-6-41fd-1854-edd6-954d-a719.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})