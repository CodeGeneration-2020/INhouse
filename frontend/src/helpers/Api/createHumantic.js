import axios from 'axios';

export const createHumantic = linkedinUrl => {
  const url = 'http://localhost:3000/humantic-ai/get-analysis'


  return axios.post(url, linkedinUrl)
}