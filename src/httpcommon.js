import axios from "axios";


export default axios.create({
  baseURL: `https://ef34-2405-201-6-41fd-14b-fd60-18e6-5905.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})