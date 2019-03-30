import React, { Component } from 'react'
import {Tabs} from 'antd'
import {FormInfo} from '../components';

const TabPane = Tabs.TabPane;

export default class Perfil extends Component {

    callback = (key) => {
        console.log(key);
    }

    render() {
        const {firebase, db} = this.props;
        const user = firebase.auth().currentUser;
        return (
        <div>
            <h4>Bienvenida {user && user.display ? user.email : 'Anónima'}</h4>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="Mi información" key="1">
                    <FormInfo firebase={firebase} db={db}/>
                </TabPane>
                <TabPane tab="Denuncia" key="2">Denuncia</TabPane>
                <TabPane tab="Agresor" key="3">Agresor</TabPane>
                <TabPane tab="Atención Médica" key="4">Atención Médica</TabPane>
            </Tabs>
        </div>
        )
    }
}
