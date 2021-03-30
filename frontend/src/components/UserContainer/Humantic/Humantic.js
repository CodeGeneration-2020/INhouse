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
  const [analyzes, setAnalyzes] = useState([])

  const mutationHumantic = useMutation(() => userService.createHumantic(inputValue.linkedInUrl), {
    onSuccess: res => {
      reset()
      setAnalyzes([...analyzes, res])
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
      <div className={classes.analyzes_wrapper}>
        {analyzes.map(analysis => <HumanticResponse key={analysis.user_id} linkedinInfo={analysis} />)}
      </div>
    </div>
  )
}

export default Humantic
