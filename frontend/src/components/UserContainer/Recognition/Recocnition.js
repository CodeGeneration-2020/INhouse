import { Button } from '@material-ui/core';
import { useState } from 'react';
import { ReactMic } from 'react-mic';
import classes from './Recognition.module.scss';
import { useMutation } from 'react-query';
import { BUTTONS } from '../../../helpers/constants/constants';
import userService from '../../../services/userService';

const Recognition = () => {
  const [record, setRecord] = useState(false)
  const [blob, setBlob] = useState(new Blob([' '], { type: 'text/plain' }))

  const questionMutation = useMutation(() => userService.questionRecognition(blob), {
    onSuccess: res => answerMutation.mutate(res.text)
  })

  const answerMutation = useMutation(question => userService.getAnswer(question))

  const startRecording = () => setRecord(true)
  const stopRecording = () => setRecord(false)
  const onStop = recordedBlob => setBlob(recordedBlob.blob)

  const recognizeHandler = () => questionMutation.mutate()

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
      { questionMutation.data &&
        <>
          <h1>Question</h1>
          <div className={classes.recognizedText}>
            {questionMutation.data.text}
          </div>
          <h1>Answer</h1>
          <div className={classes.recognizedText}>
            {answerMutation.data && answerMutation.data.answer}
          </div>
        </>
      }
    </div>
  );
}

export default Recognition;
