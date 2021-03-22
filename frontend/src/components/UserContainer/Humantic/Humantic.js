import { Button, Input } from '@material-ui/core';
import React from 'react'
import { useMutation } from 'react-query';
import { useForm } from '../../../helpers/Hooks/UseForm';
import classes from './Humantic.module.scss';
import { BUTTONS } from '../../../helpers/constants/constants';
import HumanticResponse from './HumanticResponse/HumanticResponse';
import userService from '../../../services/userService';

const Humantic = () => {
  const [inputValue, setField, reset] = useForm({ linkedInUrl: '' })

  const mutationHumantic = useMutation(() => userService.createHumantic(inputValue.linkedInUrl), {
    onSuccess: () => reset()
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
      {mutationHumantic.data && <HumanticResponse linkedinInfo={mutationHumantic.data} />}
    </div>
  )
}

export default Humantic
