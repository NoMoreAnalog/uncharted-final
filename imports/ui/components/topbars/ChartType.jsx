import React, {PropTypes, Component} from 'react';

// ChartType component - User selectable chart icon and text
class ChartType extends Component {

    componentDidMount() {
        $(this.button).popup({
            popup: $(this.popup),
            on: 'hover',
            position: 'bottom center',
            inline: true
        });
    }

    render() {

        const {click, active, imageSource, content, popup} = {...this.props};

        return (
            <button
                onClick={click}
                className={active ? 'item active' : 'item'}
                ref={(ref) => this.button = ref}
            >

                <img className="ui image" src={imageSource}/>
                <div className="content">{content}</div>

                <div
                    className="ui custom popup transition hidden"
                    ref={(ref) => this.popup = ref}
                >
                    {popup}
                </div>

            </button>
        )

    }

}

ChartType.propTypes = {
    click: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    imageSource: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    popup: PropTypes.string
};

ChartType.defaultProps = {};

export default ChartType;