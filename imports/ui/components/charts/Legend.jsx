import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Item from './Item.jsx';

// Legend component - legend to appear next to the chart, used to filter chart component
const Legend = observer((props) =>

    <div className={'legend ' + props.classed}>

        <div className="text">
            <div className="title">{props.title}</div>
            &nbsp;
            <div className="subtitle">{props.subtitle}</div>
        </div>

        <div className="list-wrapper">
            <ul className="list">
                {props.list.map(item =>
                    <Item
                        key={item._id}
                        store={props.itemStore}
                        item={item}
                    />
                )}
            </ul>
        </div>

    </div>
)

export default Legend;

Legend.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    list: PropTypes.array.isRequired,
    classed: PropTypes.string.isRequired,
    itemStore: PropTypes.any.isRequired,
    store: PropTypes.any
};

Legend.defaultProps = {
    title: 'Title',
    subtitle: 'Click to select/deselect',
    list: [],
    classed: ''
};