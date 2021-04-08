import { CircularProgress, Input } from '@material-ui/core';
import React from 'react'
import { useForm } from '../../../helpers/Hooks/UseForm';
import { BUTTONS } from '../../../helpers/constants/constants';
import HumanticResponse from './HumanticResponse/HumanticResponse';
import { GreenButton } from '../../../styles/buttons';
import { HumanticStyles } from '../../../styles/components/HumanticStyles';

const Humantic = ({ mutationHumantic }) => {
  const classes = HumanticStyles()
  const [inputValue, setField] = useForm({ linkedInUrl: '' })

  return (
    <div className={classes.humantic}>
      <div className={classes.url}>
        <Input
          placeholder='linkedIn URL'
          name="linkedInUrl"
          value={inputValue.linkedInUrl}
          onChange={setField} />
        <GreenButton 
          variant="contained" 
          color="primary" 
          className={classes.button} 
          onClick={() => mutationHumantic.mutate(inputValue.linkedInUrl)}>
          {BUTTONS.send}
        </GreenButton>
      </div>
      {mutationHumantic.isLoading && <CircularProgress className={classes.humantic_spinner} />}
      <div className={classes.response_wrapper}>
        {mutationHumantic?.data && <HumanticResponse linkedinInfo={mutationHumantic.data} />}
      </div>
      {mutationHumantic?.data === null && <div className={classes.danger}>Profile not found!</div>}
    </div>
  )
}

export default Humantic
