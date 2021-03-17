import { Button, Input } from '@material-ui/core';
import React from 'react'
import { useMutation } from 'react-query';
import { useForm } from '../../../helpers/Hooks/UseForm';
import { HUMANTIC } from '../constants/constants';
import classes from './Humantic.module.scss';
import { createHumantic } from './../../../helpers/Api/createHumantic'
import { BUTTONS } from '../../../helpers/constants/constants';

const Humantic = () => {
  const [inputValue, setField] = useForm({ linkedInUrl: '' })
  const mutationHumantic = useMutation(createHumantic, {
    onSuccess: res => console.log(res)
  })

  const sendLinkedin = () => mutationHumantic.mutate(inputValue.linkedInUrl)

  return (
    <div className={classes.humantic}>
      <Input
        placeholder='linkedIn URL'
        name="linkedInUrl"
        value={inputValue.linkedInUrl}
        onChange={setField} />
      <Button variant="contained" color="primary" onClick={sendLinkedin}>
        {BUTTONS.send}
      </Button>
      <h1>{HUMANTIC.title}</h1>
    </div>
  )
}

export default Humantic
