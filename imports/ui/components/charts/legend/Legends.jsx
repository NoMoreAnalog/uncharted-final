import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Legend from './Legend.jsx';

// Legends component - Container for the chart specific legends
const Legends = observer(['countryStore', 'indicatorStore', 'store'], (props) =>

    <div className="ui two column grid legends">

        <div className="column">

            <Legend
                title={'Country:'}
                list={props.countryStore.activeCountries}
                classed="countries"
                itemStore={props.countryStore}
                store={props.store}
            />

        </div>

        <div className="column">

            <Legend
                title={'Indicator:'}
                list={props.indicatorStore.activeIndicators}
                classed="indicators"
                itemStore={props.indicatorStore}
                store={props.store}
            />

        </div>

    </div>
)

export default Legends;

Legends.wrappedComponent.propTypes = {
    countryStore: PropTypes.any.isRequired,
    indicatorStore: PropTypes.any.isRequired,
    store: PropTypes.any.isRequired
};

Legends.wrappedComponent.defaultProps = {};