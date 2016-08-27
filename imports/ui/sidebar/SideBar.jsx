import React, {PropTypes} from 'react';
import {observer} from 'mobx-react';

import Section from './Section.jsx'

// Sidebar component - bar on right side of screen with filters
const Sidebar = observer((props) =>

    <div className="side-bar">

        <Section
            title={'Countries'}
            list={props.countryStore.countries}
            classed="countries"
            store={props.countryStore}
        />

        <Section
            title={'Indicators'}
            list={props.indicatorStore.indicators}
            classed="indicators"
            store={props.indicatorStore}
        />

        <div className="view-active-trigger">
            <a href="#" onClick={props.indicatorStore.toggleActiveIndicators}>
                {props.indicatorStore.activeIndicatorsOpen ?
                    <div><img src="ic_expand_more_white_24dp_2x.png"/>View Countries and Indicators</div> :
                    <div><img src="ic_expand_less_white_24dp_2x.png"/>View Active Indicators</div>}
            </a>
        </div>

        <Section
            title={'Active Indicators'}
            subtitle={'Click to deselect'}
            list={props.indicatorStore.indicators.filter(indicator => indicator.active === true)}
            classed={props.indicatorStore.activeIndicatorsOpen ? 'active-indicators active-indicators-open' : 'active-indicators active-indicators-closed'}
            store={props.indicatorStore}
            showCloseButton={true}
        />

    </div>
)

Sidebar.propTypes = {
    countryStore: PropTypes.any,
    indicatorStore: PropTypes.any
};

Sidebar.defaultProps = {};

export default Sidebar;
