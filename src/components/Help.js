import React, { Component } from 'react';
import { Card, Typography } from 'antd';
const { Meta } = Card;


export default class Help extends Component {
  render() {
    const {centers} = this.props;
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <div style={{flex: 1}}> 
            <h1>De acuerdo a tu caso, estos lugares podrían ser de interes para ti:</h1>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', flex: 1}} >
            {centers && centers.length > 0 && centers.map(center => {
                return (
                    <Card
                    hoverable
                    style={{ width: 220 }}
                    cover={<img alt={center.name} src={center.imgUrl} />}
                  >
                    <Meta
                      title={<a target='blank' href={center.url}>{center.name}</a>}
                      description={center.name}
                    />
                  </Card>
                )
            })}
        </div>
      </div>
    )
  }
}
