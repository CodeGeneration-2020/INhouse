import { IconButton } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import React, { useState } from "react";
import { RecognitionRowStyles } from "../../../../styles/components/RecognitionRowStyles";
import { HUMANTIC } from '../../constants/constants'

const RecognitionRow = ({ recognitionRow }) => {
  const classes = RecognitionRowStyles()
  const [display, setDisplay] = useState({ question: true, answer: true })

  return (
    <div className={classes.wrapper}>
      <div className={classes.question}>
        {display.question &&
          <>
            {recognitionRow?.whatToSay ?
              <div>
                <b>{HUMANTIC.response.say}: </b>
                {recognitionRow.whatToSay}
              </div>
              :
              <div>{recognitionRow === null ? 'Not found' : recognitionRow.question}</div>
            }
            <IconButton onClick={() => setDisplay({ ...display, question: false })}><ClearIcon /></IconButton>
          </>
        }
      </div>
      <div className={classes.answer}>
        {display.answer &&
          <>
            {!recognitionRow?.whatToSay && (
              <>
                <div>{recognitionRow === null ? 'Not found' : recognitionRow.answer}</div>
                <IconButton onClick={() => setDisplay({ ...display, answer: false })}><ClearIcon /></IconButton>
              </>
            )}
          </>
        }
      </div>
    </div>
  );
};

export default React.memo(RecognitionRow);
