import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'

// Sidebar component - bar on right side of screen with filters
const Sidebar = observer((props) =>

    <div className="side-bar">

        <Section
            title={'Countries'}
            list={props.countryStore.filteredCountries}
            classed="countries"
            store={props.countryStore}
        />

        <Section
            title={'Indicators'}
            list={props.indicatorStore.filteredIndicators}
            classed="indicators"
            store={props.indicatorStore}
        />

        <div
            className="view-active-trigger"
            onClick={props.indicatorStore.toggleActiveIndicators}
        >
            {props.indicatorStore.activeIndicatorsOpen ?
                <div><i className="material-icons">expand_more</i>View Countries and Indicators</div> :
                <div><i className="material-icons">expand_less</i>View Active Indicators</div>}
        </div>

        <Section
            title={'Active Indicators'}
            subtitle={'Click to deselect'}
            list={props.indicatorStore.filteredActiveIndicators}
            classed={props.indicatorStore.activeIndicatorsOpen ? 'active-indicators active-indicators-open' : 'active-indicators active-indicators-closed'}
            store={props.indicatorStore}
        />

    </div>
)

Sidebar.propTypes = {
    countryStore: PropTypes.any,
    indicatorStore: PropTypes.any
};

Sidebar.defaultProps = {};

export default Sidebar;
