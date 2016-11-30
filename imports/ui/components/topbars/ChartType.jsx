import React, {PropTypes, Component} from 'react';

// ChartType component - User selectable chart icon and text
export default class ChartType extends Component {

    componentDidMount() {
        $(this.button).popup({
            popup: $(this.popup),
            on: 'hover',
            position: 'bottom center',
            inline: true
        });
    }

    render() {

        const {click, active, image, text, popup} = {...this.props};

        return (
            <div>

                <div
                    onClick={click}
                    className={active ? 'item active' : 'item'}
                    ref={(ref) => this.button = ref}
                >
                    <img className="ui image" src={image}/>{text}
                </div>

                <div
                    className="ui popup transition hidden"
                    ref={(ref) => this.popup = ref}
                >
                    {popup}
                </div>

            </div>
        )

    }

}

ChartType.propTypes = {
    click: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    popup: PropTypes.string
};