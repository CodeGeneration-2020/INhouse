import { Fade } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { HumanticResponseStyles } from '../../../../styles/components/HumanticResponseStyles'
import { HUMANTIC } from '../../constants/constants'

const HumanticResponse = ({ linkedinInfo }) => {
  const classes = HumanticResponseStyles()
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true)
    }, 20000);
  }, [linkedinInfo])

  return (
    <div className={classes.linkedinInfo}>
      <h3>{linkedinInfo?.display_name}</h3>
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
      <Fade timeout={4000} in={display} >
        <div>
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
      </Fade>
    </div>
  )
}

export default HumanticResponse
