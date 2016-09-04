import React, {PropTypes} from 'react';

// Icon component - Chart icons to show on the TopBar
const ChartType = (props) => (

    <button
        onClick={props.click}
        className={props.active ? 'item active' : 'item'}
    >
        <img className="ui mini image" src={props.imageSource}/>&nbsp;
        <div className="content">{props.text}</div>
    </button>

)

ChartType.propTypes = {
    click: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    imageSource: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

ChartType.defaultProps = {};

export default ChartType;