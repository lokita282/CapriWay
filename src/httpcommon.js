import axios from "axios";


export default axios.create({
  baseURL: `https://sarthakbhan.pythonanywhere.com`,
  // baseURL: `https://cb84-2405-201-6-41fd-d05f-66e2-b339-5f64.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})