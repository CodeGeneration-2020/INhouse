import { Button } from '@material-ui/core';
import { useState } from 'react';
import { ReactMic } from 'react-mic';
import classes from './Recognition.module.scss';
import { useMutation } from 'react-query';
import { BUTTONS } from '../../../helpers/constants/constants';
import userService from '../../../services/userService';

const Recognition = () => {
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [record, setRecord] = useState(false)
  const [blob, setBlob] = useState(new Blob([' '], { type: 'text/plain' }))

  const answerMutation = useMutation(() => userService.getAnswer(question), {
    onSuccess: res => setAnswer(res.answer)
  })

  const questionMutation = useMutation(() => userService.questionRecognition(blob), {
    onSuccess: res => {
      setQuestion(res.text)
      answerMutation.mutate(res.text)
    }
  })

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
      { question &&
        <>
          <h1>Question</h1>
          <div className={classes.recognizedText}>
            {question}
          </div>
          <h1>Answer</h1>
          <div className={classes.recognizedText}>
            {answer}
          </div>
        </>
      }
    </div>
  );
}

export default Recognition;
