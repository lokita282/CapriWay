import axios from "axios";


export default axios.create({
  baseURL: `https://e1f8-2405-201-6-41fd-acde-7d1c-45c8-c282.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})