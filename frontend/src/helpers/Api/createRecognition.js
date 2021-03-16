import axios from 'axios';

export const createRecognition = blob => {
  const url = 'http://localhost:3000/speech-recognition/recognize'

  const form = new FormData()
  form.append('input', blob)

  return axios.post(url, form)
}
