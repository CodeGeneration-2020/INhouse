import React from 'react'
import classes from './HumanticResponse.module.scss'

const HumanticResponse = ({ linkedinInfo }) => {
  return (
    <div className={classes.linkedinInfo}>
      <h3>{linkedinInfo.display_name}</h3>
      <p className={classes.safe_text}>
        <b>Adjectives:</b> {linkedinInfo.persona?.hiring.communication_advice.adjectives.join(', ')}
      </p>
      <p>
        <b>Description:</b> {linkedinInfo.persona?.hiring.communication_advice.description.join(' ')}
      </p>
      <p className={classes.danger_text}>
        <b>What to avoid:</b> {linkedinInfo.persona?.hiring.communication_advice.what_to_avoid.join('. ')}
      </p>
      <p>
        <b>What to say:</b> {linkedinInfo.persona?.hiring.communication_advice.what_to_say.join('. ')}
      </p>
    </div>
  )
}

export default HumanticResponse
