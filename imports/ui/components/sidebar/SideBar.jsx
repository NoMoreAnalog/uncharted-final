import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'
import ViewActiveTrigger from './ViewActiveTrigger.jsx';
import SideBarTrigger from './SideBarTrigger.jsx';

// Sidebar component - bar on right side of screen with filters
const Sidebar = observer((props) =>

    <div className={props.uiStore.sideBarExpanded ?
        'side-bar expanded' :
        'side-bar'}>

        <SideBarTrigger store={props.uiStore}/>

        <Section
            title={'Countries'}
            list={props.countryStore.filteredCountries}
            classed="countries"
            store={props.countryStore}
            uiStore={props.uiStore}
        />

        <Section
            title={'Indicators'}
            list={props.indicatorStore.filteredIndicators}
            classed="indicators"
            store={props.indicatorStore}
            uiStore={props.uiStore}
        />

        <ViewActiveTrigger store={props.indicatorStore}/>

        <Section
            title={'Active Indicators'}
            subtitle={'Click to deselect'}
            list={props.indicatorStore.filteredActiveIndicators}
            classed={props.indicatorStore.activeIndicatorsOpen ? 'active-indicators active-indicators-open' : 'active-indicators active-indicators-closed'}
            store={props.indicatorStore}
            uiStore={props.uiStore}
        />

    </div>
)

Sidebar.propTypes = {
    countryStore: PropTypes.any,
    indicatorStore: PropTypes.any,
    uiStore: PropTypes.any
};

Sidebar.defaultProps = {};

export default Sidebar;
