import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';
import {Segment, Header, List} from 'semantic-ui-react'

import Item from './Item.jsx';

// Legend component - legend to appear next to the chart, used to filter chart component
const Legend = observer((props) =>

    <Segment className={'legend ' + props.classed}>

        <Header as='h3' textAlign='center'>
            {props.title}&nbsp;
            <span style={{fontStyle: 'italic', fontSize: '.8em'}}>{props.subtitle}</span>
        </Header>

            <List
                style={{marginLeft: '20px'}}>
                {props.list.map(item =>
                    <Item
                        key={item._id}
                        itemStore={props.itemStore}
                        item={item}
                    />
                )}
            </List>

    </Segment>
)

export default Legend;

Legend.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    list: PropTypes.array.isRequired,
    classed: PropTypes.string.isRequired,
    itemStore: PropTypes.any.isRequired
};

Legend.defaultProps = {
    subtitle: 'Click to select/deselect'
};