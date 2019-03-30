import React, { Component } from 'react'
import { Typography } from 'antd';

export default class LandingMessage extends Component {
  render() {
    return (
      <div style={{margin: '15px', minWidth: '500px'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <h1>Bienvenida a <b>Te Creo</b></h1>
            <h3>Denuncia, no vuelvas a ser víctima</h3>
          </div>
          <img style={{marginTop: '5px', height:"100px",  marginTop: '-5px', marginLeft: '5px', border: '1px', borderColor:'#F0F0F0', borderRadius: '10px', backgroundColor: 'white'}} src={require('../assets/maps.png')}/>
        </div>
        
        <br />
        <Typography><b>Te Creo</b> te acerca a ayuda que necesitas en <b>Ciudad Juarez</b>.</Typography>
        <Typography>No estas sola, encuentra ayuda <b>Médica, Psicológica, Júridica</b> profesional.</Typography>
        {/* <img style={{marginTop: '35px', height:"150px", border: '1px', borderColor:'#F0F0F0', borderRadius: '10px'}} src={require('../assets/maps.png')}/> */}
        <div syle={{display: 'flex', flexDirection: 'row'}}>
          <img style={{marginTop: '5px', height:"150px", marginTop: '60px', border: '1px', borderColor:'#F0F0F0', borderRadius: '10px'}} src={require('../assets/imm.jpg')}/>
          <img style={{marginTop: '5px', height:"150px", marginTop: '60px', marginLeft: '15px', border: '1px', borderColor:'#F0F0F0', borderRadius: '10px', backgroundColor: 'white'}} src={require('../assets/juarez.png')}/>
        </div>
      </div>
    )
  }
}
