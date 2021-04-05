import { Button, CircularProgress, debounce, Input } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ReactMic } from "react-mic";
import { useMutation } from "react-query";
import { BUTTONS } from "../../../helpers/constants/constants";
import userService from "../../../services/userService";
import RecognitionRow from "./RecognitionRow/RecognitionRow";
import { GreenButton } from "../../../styles/buttons";
import { RecognitionStyles } from '../../../styles/components/RecognitionStyles';
import Select from "../Select";

const Recognition = () => {
  const classes = RecognitionStyles()
  const [record, setRecord] = useState(false);
  const [autoRecord, setAutoRecord] = useState(false);
  const [recognitionRows, setRecognitionRows] = useState([]);
  const [userId, setUserId] = useState('')
  const [keyword, setKeyword] = useState('')

  const answerMutation = useMutation(question => userService.getAnswer(question), {
    onSuccess: res => setRecognitionRows([...recognitionRows, res])
  });

  const questionMutation = useMutation((blob) => userService.questionRecognition(blob), {
    onSuccess: res => answerMutation.mutate({ question: res.text, relatedTo: userId })
  });

  const startRecording = () => {
    setAutoRecord(false);
    setRecord(true);
  };

  const stopRecording = () => {
    setAutoRecord(false);
    setRecord(false);
  };

  const startAutoRecord = () => {
    setRecord(true);
    setAutoRecord(true);
  };

  const onStop = recordedBlob => questionMutation.mutate(recordedBlob.blob);

  useEffect(() => {
    if (!autoRecord) return;
    const sendRecordInterval = setInterval(() => {
      setRecord(false);
      setRecord(true);
    }, 15000);

    return () => clearInterval(sendRecordInterval);
  }, [autoRecord]);

  useEffect(() => {
    if (userId) answerMutation.mutate({ question: keyword, relatedTo: userId })
    // eslint-disable-next-line
  }, [keyword, userId])

  const selectHandler = e => setUserId(e.target.value)
  const keyWordHandler = e => setKeyword(e.target.value)

  return (
    <div className={classes.record}>
      <div className={classes.record_wrapper}>
        <Select state={userId} selectHandler={selectHandler} />
        <Input
          className={classes.input_keyword}
          placeholder='keyword'
          disabled={!userId}
          onChange={debounce(keyWordHandler, 1000)} />
        <GreenButton onClick={startRecording} variant="contained" disabled={!userId}>
          {BUTTONS.start}
        </GreenButton>
        <Button onClick={stopRecording} variant="contained" color="secondary" disabled={!userId}>
          {BUTTONS.stop}
        </Button>
        <Button onClick={startAutoRecord} variant="contained" color="primary" disabled={!userId}>
          {BUTTONS.autoRecord}
        </Button>
        <ReactMic
          backgroundColor="white"
          strokeColor="#000000"
          record={record}
          onStop={onStop}
        />
      </div>
      {questionMutation.isLoading && <CircularProgress className={classes.recognition_spinner} />}
      <div className={classes.recognition_rows}>
        {recognitionRows.map((recognitionRow, index) => <RecognitionRow key={index} recognitionRow={recognitionRow} />)}
      </div>
    </div>
  );
};

export default Recognition;
