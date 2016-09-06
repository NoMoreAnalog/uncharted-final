import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Item from './Item.jsx';

// Legend component - legend to appear next to the chart, used to filter chart component
const Legend = observer((props) =>

    <div className={'ui segment legend ' + props.classed}>

        <h4 className="ui center aligned header">
            {props.title}
            <div className="ui center aligned sub header">{props.subtitle}</div>
        </h4>

        <div className="list-wrapper">
            <ul className="list">
                {props.list.map(item =>
                    <Item
                        key={item._id}
                        itemStore={props.itemStore}
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
    subtitle: 'Click to select/deselect'
};