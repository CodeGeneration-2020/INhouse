import httpService from '../../services/httpService';

export const createHumantic = linkedInUrl => {
  const url = 'http://localhost:3000/humantic-ai/get-analysis'
  const body = { linkedInUrl }
  const headers = { headers: { 'Authorization': `bearer ${localStorage.getItem('token')}` } }

  return httpService.post(url, body, headers)
}