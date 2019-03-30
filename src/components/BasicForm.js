import React, { Component } from 'react'
import { Select, Divider , Typography, Button, Card } from 'antd';
import { TellMeMore } from '../components';


const Option = Select.Option;

const iSufferOptions = [
    {
        key: 'violencia',
        text: 'Violencia Física'
    },
    {
        key: 'abuso',
        text: 'Abuso verbal'
    },
    {
        key: 'acoso',
        text: 'Acoso'
    },
    {
        key: 'violacion',
        text: 'Violación'
    },
]

const byWhoOptions = [
    {
        key: 'esposo',
        text: 'Esposo'
    },
    {
        key: 'familiar',
        text: 'Familiar'
    },
    {
        key: 'extraño',
        text: 'Extraño'
    },
]

const whereOptions = [
    {
        key: 'casa',
        text: 'Casa'
    },
    {
        key: 'oficina',
        text: 'Oficina'
    },
    {
        key: 'Escuela',
        text: 'Escuela'
    },
    {
        key: 'transporte',
        text: 'Transporte'
    },
    {
        key: 'enlacalle',
        text: 'En la Calle'
    },
]

export default class BasicForm extends Component {

    state = {
        what: 'violencia',
        who: 'esposo',
        where: 'casa',
        how: '',
    }

    handleWhatChange = (what) => {
        console.log(what);
        this.setState({what})
    }

    handleWhoChange = (who) => {
        console.log(who);
        this.setState({who})
    }

    handleWhereChange = (where) => {
        console.log(where)
        this.setState({where})
    }

    handleHowChange = (how) => {
        console.log(how)
        this.setState({how})
    }

    sendForm = () => {
        const {what, who, where, how} = this.state;
        const {db, firebase, setCenters} = this.props;
        // Save the complain
        db.collection("complaints").add({
            userRef: db.doc('users/' + firebase.auth().currentUser.uid),
            incident: {what, who, where, how}, 
            information: null,
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        // Get the data
        db.collection('centros').where("style", "==", what)
        .get()
        .then(querySnapshot => {
            const centers = [];
            querySnapshot.forEach(doc => centers.push(doc.data()));
            setCenters(centers);
        });
    
    }

    render() {
        const {what, who, where, how} = this.state;
        return (
        <div>
            <Card>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <div style={{marginRight: '10px', width: 160}}>
                    <h4>{`Fuí victima de: `}</h4> 
                    </div>
                    <Select defaultValue={what} value={what} style={{ width: 160 }} onChange={this.handleWhatChange}>
                        {iSufferOptions.map(option => {
                            return (
                                <Option value={option.key}>{option.text}</Option>
                            )
                        })}
                    </Select> 
                </div>
                <br />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <div style={{marginRight: '10px', width: 160}}>
                    <h4>{`Por parte de: `}</h4> 
                    </div>
                    <Select defaultValue={who} value={who} style={{ width: 160 }} onChange={this.handleWhoChange}>
                        {byWhoOptions.map(option => {
                            return (
                                <Option value={option.key}>{option.text}</Option>
                            )
                        })}
                    </Select> 
                </div>
                <br />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <div style={{marginRight: '10px', width: 160}}>
                    <h4>{`En este lugar: `}</h4> 
                    </div>
                    <Select defaultValue={where} value={where} style={{ width: 160 }} onChange={this.handleWhereChange}>
                        {whereOptions.map(option => {
                            return (
                                <Option value={option.key}>{option.text}</Option>
                            )
                        })}
                    </Select> 
                </div>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <TellMeMore handleHowChange={this.handleHowChange} how={how}/>
                </div>
                <br />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Button type="primary" onClick={this.sendForm}>
                        Obtener información
                    </Button>
                </div>
            </Card>
        </div>
        )
    }
}
