import { Button } from '@material-ui/core';
import { useState } from 'react';
import { ReactMic } from 'react-mic';
import axios from 'axios';
import classes from './Recognition.module.scss';

const Recognition = () => {
  const [record, setRecord] = useState(false)
  const [blob, setBlob] = useState(new Blob())

  const startRecording = () => setRecord(true)
  const stopRecording = () => setRecord(false)
  const onStop = recordedBlob => setBlob(recordedBlob.blob)

  const recognizeHandler = async () => {
    const form = new FormData()
    form.append('input', blob)
    const recognizeUrl = 'http://localhost:3000/speech-recognition/recognize'
    const res = await axios(recognizeUrl, form)
    console.log(res);
  }

  return (
    <div className={classes.record}>
      <ReactMic
        backgroundColor="white" 
        strokeColor="#000000"
        record={record}
        onStop={onStop} />
      <div className={classes.recordBtns}>
        <Button variant="contained" color="primary" onClick={startRecording} >
          Start
        </Button>
        <Button onClick={stopRecording} variant="contained" color="secondary">
          Stop
        </Button>
      </div>
      <div className={classes.sendAudio}>
        <audio controls src={URL.createObjectURL(blob)} />
        <Button variant="contained" color="primary" onClick={recognizeHandler}>
          Send audio
        </Button>
      </div>
    </div>
  );
}

export default Recognition;
