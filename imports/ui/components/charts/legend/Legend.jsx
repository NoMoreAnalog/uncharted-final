// Libs
import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';
import {Segment, Header, List} from 'semantic-ui-react'

// Components
import Item from './Item.jsx';

// Legend component - legend to appear next to the chart, used to filter chart component
export default class Legend extends Component {

    render() {

        const {classed, title, subtitle, list, itemStore} = {...this.props};

        return (
            <Segment className={'legend ' + classed}>

                <Header as='h3' textAlign='center'>
                    {title}&nbsp;
                    <span style={{fontStyle: 'italic', fontSize: '.8em'}}>{subtitle}</span>
                </Header>

                <List
                    horizontal
                    style={{marginLeft: '20px'}}>
                    {list.map(item =>
                        <Item
                            key={item._id}
                            itemStore={itemStore}
                            item={item}
                        />
                    )}
                </List>

            </Segment>
        )

    }

}

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