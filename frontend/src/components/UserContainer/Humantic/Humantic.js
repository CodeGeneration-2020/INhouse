import { Button, Input } from '@material-ui/core';
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { useForm } from '../../../helpers/Hooks/UseForm';
import classes from './Humantic.module.scss';
import { BUTTONS } from '../../../helpers/constants/constants';
import userService from '../../../services/userService/userService';

const Humantic = () => {
  const [linkedinInfo, setLinkedinInfo] = useState()

  const [inputValue, setField] = useForm({ linkedInUrl: '' })
  const mutationHumantic = useMutation(() => userService.createHumantic(inputValue.linkedInUrl), {
    onSuccess: res => setLinkedinInfo(res)
  })

  const sendLinkedin = () => mutationHumantic.mutate()

  return (
    <div className={classes.humantic}>
      <div>
        <Input
          placeholder='linkedIn URL'
          name="linkedInUrl"
          value={inputValue.linkedInUrl}
          onChange={setField} />
        <Button variant="contained" color="primary" onClick={sendLinkedin}>
          {BUTTONS.send}
        </Button>
      </div>
      {linkedinInfo &&
        <div className={classes.linkedinInfo}>
          <h3>{linkedinInfo.display_name}</h3>
          <p className={classes.safe_text}>
            <b>Adjectives:</b> {linkedinInfo.persona.hiring.communication_advice.adjectives.join(', ')}.
          </p>
          <p>
            <b>Description:</b> {linkedinInfo.persona.hiring.communication_advice.description.join(' ')}
          </p>
          <p className={classes.danger_text}>
            <b>What to avoid:</b> {linkedinInfo.persona.hiring.communication_advice.what_to_avoid.join('. ')}
          </p>
          <p>
            <b>What to say:</b> {linkedinInfo.persona.hiring.communication_advice.what_to_say.join('. ')}
          </p>
        </div>
      }
    </div>
  )
}

export default Humantic
