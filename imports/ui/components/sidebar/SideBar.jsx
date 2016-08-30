import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'
import ViewActiveTrigger from './ViewActiveTrigger.jsx';
import SideBarTrigger from './SideBarTrigger.jsx';

// Sidebar component - bar on right side of screen with filters
const Sidebar = observer((props) =>

    <div className={props.store.sideBarExpanded ?
        'side-bar expanded' :
        'side-bar'}>

        <SideBarTrigger store={props.store}/>

        <Section
            title={'Countries'}
            list={props.countryStore.filteredCountries}
            classed="countries"
            itemStore={props.countryStore}
            store={props.store}
        />

        <Section
            title={'Indicators'}
            list={props.indicatorStore.filteredIndicators}
            classed="indicators"
            itemStore={props.indicatorStore}
            store={props.store}
        />

        <ViewActiveTrigger store={props.store}/>

        <Section
            title={'Active Indicators'}
            subtitle={'Click to deselect'}
            list={props.indicatorStore.filteredActiveIndicators}
            classed={props.store.activeIndicatorsOpen ? 'active-indicators active-indicators-open' : 'active-indicators active-indicators-closed'}
            itemStore={props.indicatorStore}
            store={props.store}
        />

    </div>
)

Sidebar.propTypes = {
    countryStore: PropTypes.any,
    indicatorStore: PropTypes.any,
    store: PropTypes.any
};

Sidebar.defaultProps = {};

export default Sidebar;
