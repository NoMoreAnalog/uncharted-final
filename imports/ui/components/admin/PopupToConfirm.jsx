import React, {Component} from 'react'
import {Button, Modal} from 'semantic-ui-react'

export default class PopupToConfirm extends Component {

    state = {open: false}

    _close = () => this.setState({open: false})

    _callback = () => {
        this._close();
        this.state.callback();
    }

    render() {

        const {open, header, content, positive, negative, primary, secondary, left, right} = {...this.state};

        return (
            <Modal
                open={open}
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                onClose={this._close}>

                <Modal.Header>{header}</Modal.Header>
                <Modal.Content><p>{content}</p></Modal.Content>

                <Modal.Actions>
                    <Button
                        onClick={this._close}
                        positive={positive}
                        negative={negative}
                        primary={primary}
                        secondary={secondary}
                        content={left}
                    />
                    <Button
                        onClick={this._callback}
                        positive={positive}
                        negative={negative}
                        primary={primary}
                        secondary={secondary}
                        content={right}
                    />
                </Modal.Actions>

            </Modal>
        )
    }
}