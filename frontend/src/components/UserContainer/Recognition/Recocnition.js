import { Button } from '@material-ui/core';
import { useState } from 'react';
import { ReactMic } from 'react-mic';
import classes from './Recognition.module.scss';
import { useMutation } from 'react-query';
import { createRecognition } from '../../../helpers/Api/createRecognition';
import { BUTTONS } from '../../../helpers/constants/constants';
import { RECOGNITION } from '../constants/constants';

const Recognition = () => {
  const [recognizedText, setRecognizedText] = useState('')
  const [record, setRecord] = useState(false)
  const [blob, setBlob] = useState(new Blob([' '], { type: 'text/plain' }))
  const mutation = useMutation(createRecognition, {
    onSuccess: res => setRecognizedText(res.data.text)
  })

  const startRecording = () => setRecord(true)
  const stopRecording = () => setRecord(false)
  const onStop = recordedBlob => setBlob(recordedBlob.blob)

  const recognizeHandler = () => mutation.mutate(blob)

  return (
    <div className={classes.record}>
      <ReactMic
        backgroundColor="white"
        strokeColor="#000000"
        record={record}
        onStop={onStop} />
      <div className={classes.recordBtns}>
        <Button variant="contained" color="primary" onClick={startRecording} >
          {BUTTONS.start}
        </Button>
        <Button onClick={stopRecording} variant="contained" color="secondary">
          {BUTTONS.stop}
        </Button>
      </div>
      <div className={classes.sendAudio}>
        <audio controls src={URL.createObjectURL(blob)} />
        <Button variant="contained" color="primary" onClick={recognizeHandler}>
          {BUTTONS.send}
        </Button>
      </div>
      { recognizedText &&
        <>
          <h1>{RECOGNITION.recognizedText}</h1>
          <div className={classes.recognizedText}>
            {recognizedText}
          </div>
        </>
      }
    </div>
  );
}

export default Recognition;
