import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'
import ViewActiveTrigger from './ViewActiveTrigger.jsx';
import SideBarTrigger from './SideBarTrigger.jsx';

// Sidebar component - bar on right side of screen with filters
const Sidebar = observer(['countryStore', 'indicatorStore', 'store'], (props) =>

    <div className={props.store.sideBarExpanded ? 'side-bar expanded' : 'side-bar'}>

        <SideBarTrigger />

        <Section
            title={'Countries'}
            list={props.countryStore.filteredCountries}
            classed="countries"
            itemStore={props.countryStore}
        />

        <Section
            title={'Indicators'}
            list={props.indicatorStore.filteredIndicators}
            classed="indicators"
            itemStore={props.indicatorStore}
        />

        <ViewActiveTrigger />

        <Section
            title={'Active Indicators'}
            subtitle={'Click to deselect'}
            list={props.indicatorStore.filteredActiveIndicators}
            classed={props.store.activeIndicatorsOpen ? 'active-indicators open' : 'active-indicators closed'}
            itemStore={props.indicatorStore}
        />

    </div>
)

export default Sidebar;

Sidebar.wrappedComponent.propTypes = {
    countryStore: PropTypes.any,
    indicatorStore: PropTypes.any,
    store: PropTypes.any
};

Sidebar.wrappedComponent.defaultProps = {};
