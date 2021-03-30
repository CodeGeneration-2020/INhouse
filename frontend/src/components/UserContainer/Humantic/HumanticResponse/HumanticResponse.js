import React from 'react'
import { HUMANTIC } from '../../constants/constants'
import classes from './HumanticResponse.module.scss'

const HumanticResponse = ({ linkedinInfo }) => {
  return (
    <div className={classes.linkedinInfo}>
      <h3>{linkedinInfo.display_name}</h3>
      <p className={classes.safe_text}>
        <b>{HUMANTIC.response.adjectives} </b>
        {`${linkedinInfo.persona?.hiring?.communication_advice.adjectives.join(', ') ?? 'not found'}.`}
      </p>
      <p>
        <b>{HUMANTIC.response.description} </b>
        {linkedinInfo.persona?.hiring?.communication_advice.description.join(' ') ?? 'not found'}
      </p>
      <p className={classes.danger_text}>
        <b>{HUMANTIC.response.avoid} </b>
        {`${linkedinInfo.persona?.hiring?.communication_advice.what_to_avoid.join('. ') ?? 'not found'}.`}
      </p>
      <p>
        <b>{HUMANTIC.response.say}: </b>
        {`${linkedinInfo.persona?.hiring?.communication_advice.what_to_say.join('. ') ?? 'not found'}.`}
      </p>
    </div>
  )
}

export default HumanticResponse
