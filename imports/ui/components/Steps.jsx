// Libs
import React, {Component} from 'react';
import {Dimmer, Image} from 'semantic-ui-react';
import {observer} from 'mobx-react';

// Steps component - tutorial steps initially displayed to the user
@observer(['store'])
export default class Steps extends Component {

    state = {}

    constructor() {

        super();

        this._handleHide = this._handleHide.bind(this);

        if (typeof(Storage) !== 'undefined') {

            this.state.active = localStorage.getItem('Steps.active');

            if (this.state.active === 'true' ||
                this.state.active === 'undefined' ||
                this.state.active === null) {
                this.state.active = true;
            } else {
                this.state.active = false;
            }

        } else {
            this.state.active = false;
        }

    }

    _handleHide(event, props) {
        localStorage.setItem('Steps.active', false);
        this.setState({active: false});
    }

    render() {

        const {active} = this.state;
        if (!active) return <div/>;

        const {store} = this.props;

        const dimmerStyle = {
            backgroundColor: 'rgba(0,0,0,0)'
        }

        const imageStyle = {
            height: 150,
            position: 'fixed'
        };

        const stepOneStyle = Object.assign({top: store.step1Pos.top, right: store.step1Pos.right}, imageStyle);
        const stepTwoStyle = Object.assign({top: store.step2Pos.top, right: store.step2Pos.right}, imageStyle);
        const stepThreeStyle = Object.assign({top: store.step3Pos.top, right: store.step3Pos.right + 100}, imageStyle);

        return (
            <div className='steps'>
                <Dimmer
                    active
                    page
                    onClick={this._handleHide}
                    style={dimmerStyle}>
                    <Image src='1_step.png' style={stepOneStyle}/>
                    <Image src='2_step.png' style={stepTwoStyle}/>
                    <Image src='3_step.png' style={stepThreeStyle}/>
                </Dimmer>
            </div>
        )

    }

}