import React from 'react'
import { HumanticResponseStyles } from '../../../../styles/components/HumanticResponseStyles'
import { HUMANTIC } from '../../constants/constants'

const HumanticResponse = ({ linkedinInfo }) => {
  const classes = HumanticResponseStyles()
  if (linkedinInfo) console.log(linkedinInfo.persona.sales.communication_advice.key_traits)

  return (
    <div className={classes.linkedinInfo}>
      <h3>{linkedinInfo.display_name}</h3>
      <p className={classes.safe_text}>
        <b>{HUMANTIC.response.adjectives} </b>
        {`${linkedinInfo.persona?.sales?.communication_advice.adjectives.join(', ') ?? 'not found'}.`}
      </p>
      <p>
        <b>{HUMANTIC.response.description} </b>
        {linkedinInfo.persona?.sales?.communication_advice.description.join(' ') ?? 'not found.'}
      </p>
      <p className={classes.danger_text}>
        <b>{HUMANTIC.response.avoid} </b>
        {`${linkedinInfo.persona?.sales?.communication_advice.what_to_avoid.join(' ') ?? 'not found'}`}
      </p>
      <p>
        <b>{HUMANTIC.response.say}: </b>
        {`${linkedinInfo.persona?.sales?.communication_advice.what_to_say.join(' ') ?? 'not found'}`}
      </p>
      <p>
        <b>Speed: </b>
        {`${linkedinInfo.persona?.sales?.communication_advice.key_traits.Speed ?? 'not found'}`}
      </p>
      <p>
        <b>Ability to say no: </b>
        {`${linkedinInfo.persona?.sales?.communication_advice.key_traits['Ability To Say No'] ?? 'not found'}`}
      </p>
      <p>
        <b>Desicion drivers: </b>
        {`${linkedinInfo.persona?.sales?.communication_advice.key_traits['Decision Drivers'] ?? 'not found'}`}
      </p>
      <p>
        <b>Risk appetite: </b>
        {`${linkedinInfo.persona?.sales?.communication_advice.key_traits['Risk Appetite'] ?? 'not found'}`}
      </p>
    </div>
  )
}

export default HumanticResponse
