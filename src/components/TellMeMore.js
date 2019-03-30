import React, { Component } from 'react'
import { Input, Typography } from 'antd';

const { TextArea } = Input;

export default class TellMeMore extends Component {

    state={
        isOpen: false
    }

    open = () => {
        this.setState({isOpen: true})
    }

    close = () => {
        this.setState({isOpen: false})
    }

    handleChange = (e) => {
        const {handleHowChange} = this.props;
        handleHowChange(e.target.value);
    }

    render() {
        const {isOpen} = this.state;
        return (
        <React.Fragment>
            <br />
            {!isOpen ? (
                <a onClick={this.open}>¿Quieres contarnos mas?</a>
            ) : (
                <div style={{width: '400px', justifyContent: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <h4>¿Qué sucedio?</h4>
                        <a onClick={this.close}>Cerrar</a>
                    </div>
                    <TextArea onChangeCapture={this.handleChange} />
                </div>
            )}
        </React.Fragment>
        )
    }
}
