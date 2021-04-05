import { CircularProgress, Input } from '@material-ui/core';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { useForm } from '../../../helpers/Hooks/UseForm';
import { BUTTONS } from '../../../helpers/constants/constants';
import HumanticResponse from './HumanticResponse/HumanticResponse';
import userService from '../../../services/userService';
import { GreenButton } from '../../../styles/buttons';
import { HumanticStyles } from '../../../styles/components/HumanticStyles';

const Humantic = () => {
  const classes = HumanticStyles()
  const [inputValue, setField, reset] = useForm({ linkedInUrl: '' })
  const [analysis, setAnalysis] = useState(false)
  const [alert, setAlert] = useState(false)

  const mutationHumantic = useMutation(() => userService.createHumantic(inputValue.linkedInUrl), {
    onSuccess: res => reset()
  })

  return (
    <div className={classes.humantic}>
      <div className={classes.url}>
        <Input
          placeholder='linkedIn URL'
          name="linkedInUrl"
          value={inputValue.linkedInUrl}
          onChange={setField} />
        <GreenButton variant="contained" color="primary" className={classes.button} onClick={() => mutationHumantic.mutate()}>
          {BUTTONS.send}
        </GreenButton>
      </div>
      <div className={classes.humantic_content}>
        {mutationHumantic.isLoading && <CircularProgress className={classes.humantic_spinner} />}
        <div className={classes.analyzes_wrapper}>
          {mutationHumantic?.data && <HumanticResponse linkedinInfo={mutationHumantic.data} />}
          {mutationHumantic?.data === null && <div className={classes.danger}>Profile not found!</div>}
        </div>
      </div>
    </div>
  )
}

export default Humantic
