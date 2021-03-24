import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ReactMic } from 'react-mic';
import classes from './Recognition.module.scss';
import { useMutation } from 'react-query';
import { BUTTONS } from '../../../helpers/constants/constants';
import userService from '../../../services/userService';
import RecognitionRow from './RecognitionRow/RecognitionRow';

const Recognition = () => {
  const [record, setRecord] = useState(false)
  const [autoRecord, setAutoRecord] = useState(false)
  const [audio, setAudio] = useState(new Blob([' '], { type: 'text/plain' }))
  const [recognitionRows, setRecognitionRows] = useState([])

  const answerMutation = useMutation(question => userService.getAnswer(question), {
    onSuccess: res => setRecognitionRows(
      [...recognitionRows, { question: res.question, answer: res.answer }]
    )
  })

  const questionMutation = useMutation(blob => userService.questionRecognition(blob), {
    onSuccess: res => answerMutation.mutate(res.text)
  })

  const startRecording = () => {
    setAutoRecord(false)
    setRecord(true)
  }

  const stopRecording = () => setRecord(false)
  const startAutoRecord = () => {
    setRecord(true)
    setAutoRecord(true)
  }
  const onStop = recordedBlob => {
    questionMutation.mutate(recordedBlob.blob)
    setAudio(recordedBlob.blob)
  }

  useEffect(() => {
    if (!autoRecord) return;
    const sendRecordInterval = setInterval(() => {
      setRecord(false)
      setRecord(true)
    }, 15000);

    return () => clearInterval(sendRecordInterval);
  }, [autoRecord]);

  return (
    <div className={classes.record}>
      <div className={classes.record_wrapper}>
        <ReactMic
          backgroundColor="white"
          strokeColor="#000000"
          record={record}
          onStop={onStop}
        />
        <Button onClick={startRecording} variant="contained" color="primary">{BUTTONS.start}</Button>
        <Button onClick={stopRecording} variant="contained" color="secondary">{BUTTONS.stop}</Button>
        <Button onClick={startAutoRecord}>Auto Record</Button>
        <audio controls src={URL.createObjectURL(audio)} />
      </div>
      {recognitionRows.map((recognitionRow, index) =>
        <RecognitionRow key={index} recognitionRow={recognitionRow} />
      )}
    </div>
  );
}

export default Recognition;
