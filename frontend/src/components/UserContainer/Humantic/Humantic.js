import { CircularProgress, Input } from '@material-ui/core';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { useForm } from '../../../helpers/Hooks/UseForm';
import classes from './Humantic.module.scss';
import { BUTTONS } from '../../../helpers/constants/constants';
import HumanticResponse from './HumanticResponse/HumanticResponse';
import userService from '../../../services/userService';
import { GreenButton } from '../../../styles/buttons';
import { v4 as uuidv4 } from 'uuid';

const Humantic = () => {
  const [inputValue, setField, reset] = useForm({ linkedInUrl: '' })
  const [analyzes, setAnalyzes] = useState([])
  const [alert, setAlert] = useState(false)

  const mutationHumantic = useMutation(() => userService.createHumantic(inputValue.linkedInUrl), {
    onSuccess: res => {
      if (res === null) {
        setAlert(true)
      } else {
        setAlert(false)
        setAnalyzes([...analyzes, res])
      }
      reset()
    }
  })

  return (
    <div className={classes.humantic}>
      <div>
        <Input
          placeholder='linkedIn URL'
          name="linkedInUrl"
          value={inputValue.linkedInUrl}
          onChange={setField} />
        <GreenButton variant="contained" color="primary" onClick={() => mutationHumantic.mutate()}>
          {BUTTONS.send}
        </GreenButton>
      </div>
      {mutationHumantic.isLoading && <CircularProgress className={classes.humantic_spinner} />}
      {alert && <div className={classes.danger}>Profile not found!</div>}
      {analyzes.map(analysis => <HumanticResponse key={uuidv4()} linkedinInfo={analysis} /> )}
    </div>
  )
}

export default Humantic
