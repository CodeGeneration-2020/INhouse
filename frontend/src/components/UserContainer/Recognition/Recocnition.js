import { Button } from '@material-ui/core';
import { useState } from 'react';
import { ReactMic } from 'react-mic';
import classes from './Recognition.module.scss';
import { useMutation } from 'react-query';
import { BUTTONS } from '../../../helpers/constants/constants';
import userService from '../../../services/userService';
import RecognitionRow from './RecognitionRow/RecognitionRow';

const Recognition = () => {
  const [record, setRecord] = useState(false)
  const [blob, setBlob] = useState(new Blob([' '], { type: 'text/plain' }))
  const [recognitionRows, setRecognitionRows] = useState([])

  const answerMutation = useMutation(question => userService.getAnswer(question), {
    onSuccess: res => setRecognitionRows(
      [...recognitionRows, { question: res.question, answer: res.answer }]
    )
  })

  const questionMutation = useMutation(() => userService.questionRecognition(blob), {
    onSuccess: res => answerMutation.mutate(res.text)
  })

  const recognizeHandler = () => questionMutation.mutate()

  const startRecording = () => setRecord(true)
  const stopRecording = () => setRecord(false)
  const onStop = recordedBlob => setBlob(recordedBlob.blob)

  return (
    <div className={classes.record}>
      <div className={classes.record_wrapper}>
        <ReactMic backgroundColor="white" strokeColor="#000000" record={record} onStop={onStop} />
        <Button variant="contained" color="primary" onClick={startRecording}>{BUTTONS.start}</Button>
        <Button onClick={stopRecording} variant="contained" color="secondary">{BUTTONS.stop}</Button>
        <audio controls src={URL.createObjectURL(blob)} />
        <Button variant="contained" color="primary" onClick={recognizeHandler}>{BUTTONS.send}</Button>
      </div>
      {recognitionRows.map((recognitionRow, index) =>
        <RecognitionRow key={index} recognitionRow={recognitionRow} />
      )}
    </div>
  );
}

export default Recognition;
