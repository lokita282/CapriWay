import axios from "axios";


export default axios.create({
  baseURL: `https://bfea-2402-3a80-75b-ed23-7dd3-ad5-34cb-547e.ngrok-free.app`,

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  mode: 'cors',
})