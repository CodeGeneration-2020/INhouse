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
import Transcript from "./Transcript/Transcript";

const Recognition = ({ mutationHumantic }) => {
  const classes = RecognitionStyles()
  const [record, setRecord] = useState(false);
  const [autoRecord, setAutoRecord] = useState(false);
  const [recognitionRows, setRecognitionRows] = useState([]);
  const [transcripts, setTranscripts] = useState([])
  const [userId, setUserId] = useState('')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (mutationHumantic.data) {
      const whatToSay = `${mutationHumantic.data.persona.sales.communication_advice.what_to_say.join(' ')}`
      setRecognitionRows(rows => [{ whatToSay, answer: '', }, ...rows])
    }
  }, [mutationHumantic.data])

  const answerMutation = useMutation(question => userService.getAnswer(question), {
    onSuccess: res => setRecognitionRows([...res, ...recognitionRows])
  });

  const questionMutation = useMutation((blob) => userService.questionRecognition(blob), {
    onSuccess: res => {
      if (res.text) setTranscripts([res.text, ...transcripts])
      answerMutation.mutate({ questions: res.questions, userId })
    }
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
    }, 3000);

    return () => clearInterval(sendRecordInterval);
  }, [autoRecord]);

  useEffect(() => {
    if (userId) answerMutation.mutate({ questions: [keyword], userId })
    // eslint-disable-next-line
  }, [keyword])

  const selectHandler = e => setUserId(e.target.value)
  const keyWordHandler = e => setKeyword(e.target.value)

  return (
    <div className={classes.record}>
      <div className={classes.headers}>
        <h1 className={classes.question_header}>Questions</h1>
        <h1 className={classes.answer_header}>Answer</h1>
        <h1 className={classes.transcript_header}>Transcript </h1>
      </div>
      {(answerMutation.isLoading || questionMutation.isLoading) &&
        <CircularProgress className={classes.recognition_spinner} />
      }
      <div className={classes.recognition_content}>
        <div className={classes.qa}>
          {recognitionRows.map((recognitionRow, index) =>
            <RecognitionRow key={index} recognitionRow={recognitionRow} />
          )}
        </div>
        <div className={classes.transcript}>
          {transcripts.map((transcript, index) => <Transcript key={index} transcript={transcript} />)}
        </div>
      </div>
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
    </div>
  );
};

export default Recognition;
