import axios from "axios";


export default axios.create({
  baseURL: `https://a55d-2405-201-6-41fd-298e-7d54-c47b-ddaf.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})