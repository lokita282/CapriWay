import axios from "axios";


export default axios.create({
  //production url
  // baseURL: `https://sarthakbhan.pythonanywhere.com`,

  // development url
  baseURL: `https://3c53-2405-201-6-41fd-b12f-289d-fcfa-2dae.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})