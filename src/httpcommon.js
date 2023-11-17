import axios from "axios";


export default axios.create({
  baseURL: `https://2e89-2405-201-6-41fd-4d9c-b89e-7674-45eb.ngrok-free.app/`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})