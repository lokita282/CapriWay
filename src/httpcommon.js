import axios from "axios";


export default axios.create({
  baseURL: `https://ea41-2405-201-6-41fd-e848-6f36-256a-b3e.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})