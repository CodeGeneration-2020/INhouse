import axios from 'axios';
import httpService from '../../services/httpService';

export const createRecognition = blob => {
  const url = 'http://localhost:3000/speech-recognition/recognize'

  const form = new FormData()
  form.append('input', blob)

  return httpService.post(url, form)
}
