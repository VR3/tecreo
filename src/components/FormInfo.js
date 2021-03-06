import React, { Component } from 'react'
import { Card, Form, Input, Icon, DatePicker, Checkbox, Button, TimePicker, Select, Cascader, InputNumber, notification} from 'antd';
import jsPDF from 'jspdf';

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Guardado',
    description: 'Tu información ha sido guardada éxitosamente.',
  });
};

  const { Option } = Select;

class FormInfo extends Component {

    state = {
        pdfAvailable: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.submitInfo(values);
          }
        });
      }

    submitInfo = async (values) => {
        const { firebase, db } = this.props;
        const currentDocs = [];

        const categoryDocRef = 
        await db.collection('users')
        .doc(firebase.auth().currentUser.uid);

        await db.collection("complaints")
        .where("userRef", "==", categoryDocRef)
        .get()
        .then(querySnapshot => {
            console.log(querySnapshot);
            querySnapshot.forEach(doc => currentDocs.push(doc.id));
        });

        await db.collection("complaints")
        .doc(currentDocs[0])
        .update({information: values})
        .then(() => {
            this.setState({pdfAvailable: true})
            openNotificationWithIcon('success');
            console.log('Success')
        });
    }

    renderPDF = async () => {
        var lMargin=15; //left margin in mm
        var rMargin=15; //right margin in mm
        var pdfInMM=210;  // width of A4 in mm
        const { firebase, db } = this.props;
        const doc = new jsPDF();
        doc.setFontSize(14);

        const currentDocs = [];

        const categoryDocRef = 
        await db.collection('users')
        .doc(firebase.auth().currentUser.uid);

        await db.collection("complaints")
        .where("userRef", "==", categoryDocRef)
        .get()
        .then(querySnapshot => {
            console.log(querySnapshot);
            querySnapshot.forEach(doc => currentDocs.push(doc.data()));
        });

        let pdfText='';
        currentDocs.map(currentDoc => pdfText = pdfText +`\n{\n\tIncidente: ${JSON.stringify(currentDoc.incident)}\n\tInformación: ${(JSON.stringify(currentDoc.information))}\n},`)

        var lines =doc.splitTextToSize(pdfText, (pdfInMM-lMargin-rMargin));
	    doc.text(lMargin,20,lines);
        doc.save(`${firebase.auth().currentUser.uid}.pdf`)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {pdfAvailable} = this.state;
        return (
        <div>
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('nombre', {
                            rules                           : [{ required: true, message: 'Por favor ingresa un nombre valido' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tu nombre..." />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(33% - 12px)' }}>
                            {getFieldDecorator('localidad', {
                                rules                           : [{ required: true, message: 'Localidad' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Localidad..." />
                            )}
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginLeft: '10px', width: 'calc(33% - 12px)' }}>
                            {getFieldDecorator('municipio', {
                                rules                           : [{ required: true, message: 'Municipio' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Municipio..." />
                            )}
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginLeft: '10px', width: 'calc(33%)' }}>
                            {getFieldDecorator('entidad', {
                                rules                           : [{ required: true, message: 'Entidad' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Entidad..." />
                            )}
                        </Form.Item>
                    </Form.Item>
                    <Form.Item style={{marginTop: '-20px'}}>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(22%)' }}>
                            {getFieldDecorator('edad', {
                                rules                           : [{ required: true, message: 'Ingresa tu edad' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Edad..." />
                            )}
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginLeft: '10px', width: 'calc(22%)' }}>
                            {getFieldDecorator('genero', {
                                rules                           : [{ required: true, message: 'Genero' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Genero..." />
                            )}
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginLeft: '10px', width: 'calc(22%)' }}>
                            {getFieldDecorator('embarazo', {
                                rules                           : [{ required: true, message: 'Estas embarazada?' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Embarazo..." />
                            )}
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginLeft: '10px', width: 'calc(22%)' }}>
                            {getFieldDecorator('discapacidad', {
                                rules                           : [{ required: true, message: 'Tienes Discapacidad?' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Discapacidad..." />
                            )}
                        </Form.Item>
                    </Form.Item>
                    <Form.Item style={{marginTop: '-20px'}}>
                        <Form.Item style={{ display: 'inline-block', width: 'calc(45%)' }}>
                            {getFieldDecorator('curp', {
                                rules                           : [{ required: true, message: 'Ingresa tu CURP' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="CURP..." />
                            )}
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginLeft: '10px', width: 'calc(45%)' }}>
                            {getFieldDecorator('seguro', {
                                rules                           : [{ required: true, message: 'Estas asociado a algun segurp?' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Seguro Popular..." />
                            )}
                        </Form.Item>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Guardar
                        </Button>
                        {pdfAvailable && (
                            <Button type="default" style={{float: 'right'}} onClick={this.renderPDF}>
                                Descargar PDF
                            </Button>
                        )}
                        
                    </Form.Item>
                </Form>
            </Card>
        </div>
        )
    }
}

const WrappedFormInfo = Form.create({ name: 'form_info' })(FormInfo);

export default WrappedFormInfo
