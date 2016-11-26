import React, {Component, PropTypes} from 'react'
import {Button, Modal} from 'semantic-ui-react'

class PopupToConfirm extends Component {

    state = {open: false}

    close = () => this.setState({open: false})

    callback = () => {
        this.close();
        this.state.callback();
    }

    render() {
        return (
            <Modal
                open={this.state.open}
                closeOnEscape={false}
                closeOnRootNodeClick={false}
                onClose={this.close}>

                <Modal.Header>{this.state.header}</Modal.Header>
                <Modal.Content><p>{this.state.content}</p></Modal.Content>

                <Modal.Actions>
                    <Button
                        onClick={this.close}
                        positive={this.state.positive}
                        negative={this.state.negative}
                        primary={this.state.primary}
                        secondary={this.state.secondary}
                        content={this.state.left}
                    />
                    <Button
                        onClick={this.callback}
                        positive={this.state.positive}
                        negative={this.state.negative}
                        primary={this.state.primary}
                        secondary={this.state.secondary}
                        content={this.state.right}
                    />
                </Modal.Actions>

            </Modal>
        )
    }
}

export default PopupToConfirm;