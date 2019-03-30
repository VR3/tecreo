import React, { Component } from 'react'
import { Typography } from 'antd';

export default class LandingMessage extends Component {
  render() {
    return (
      <div style={{margin: '15px', minWidth: '500px'}}>
        <h1>Bienvenida a <b>Te Creo</b></h1>
        <h3>Denuncia, no vuelvas a ser víctima</h3>
        <br />
        <Typography><b>Te Creo</b> te acerca a ayuda que necesitas en <b>Ciudad Juarez</b>.</Typography>
        <Typography>No estas sola, encuentra ayuda <b>Médica, Psicológica, Júridica</b> profesional.</Typography>
      </div>
    )
  }
}
